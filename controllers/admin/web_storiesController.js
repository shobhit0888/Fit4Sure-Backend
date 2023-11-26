const Stories = require("../../models/Web_Stories");
const Adminauth = require("../../models/Adminauth");
const firebaseApp = require("../../firebase");
const multer = require("multer");
const imageFilter = require("../../config/imageFilter");

const storage = firebaseApp.storage();

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = async (imageFile) => {
  try {
    const fileName =generateUniqueFileName(imageFile.originalname);
    const filePath = `web_stories/${fileName}`;
    const file = bucket.file(filePath);

    // Create a write stream to upload the image file
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Pipe the image file to the write stream
    writeStream.end(imageFile.buffer);

    // Handle the completion of the upload
    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(filePath);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error("Error uploading image to Firebase Storage");
  }
};

class StoriesController {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const stories = await Stories.find({});
      const storiesWithImageURLs = await Promise.all(
        stories.map(async (story) => {
          const file = storage.bucket().file(story.image);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return { ...story.toObject(), image: signedUrl };
        })
      );
      return res.render("admin/web_stories", {
        stories: storiesWithImageURLs,
        admin,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static get_all_stories = async (req, res) => {
    try {
      const stories = await Stories.find({});
      const storiesWithImageURLs = await Promise.all(
        stories.map(async (story) => {
          const file = storage.bucket().file(story.image);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return { ...story.toObject(), image: signedUrl };
        })
      );
      return res.send({
        stories: storiesWithImageURLs,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(500).send(err);
        } else if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        if (!req.file) {
          return res.status(400).send("Please upload an image file");
        }

        const imageUrl = await uploadImageToFirebase(req.file);
        const stories = new Stories({
          name: req.body.name,
          age: req.body.age,
          occupation: req.body.occupation,
          weight_loss: req.body.weight_loss,
          description: req.body.description,
          image: imageUrl,
        });
        await stories.save();
        return res.send({
          message: "Story Added Successfully",
        });
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const stories = await Stories.findOne({ _id: req.body.id });

      // Delete the image from Firebase Storage
      const filePath = stories.image;
      const file = bucket.file(filePath);
      await file.delete();

      await Stories.findByIdAndDelete({ _id: req.body.id });

      return res.send({
        message: "Story Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");

module.exports = StoriesController;
