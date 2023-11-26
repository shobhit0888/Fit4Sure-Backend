const Features = require("../../models/Web_Features");
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
      const fileName = generateUniqueFileName(imageFile.originalname);
      const filePath = `web_features/${fileName}`;
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
  

class FeaturesController {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const features = await Features.find({});
      const featuresWithImageURLs = await Promise.all(
        features.map(async (feature) => {
          const file = storage.bucket().file(feature.image);
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });
          return { ...feature.toObject(), image: signedUrl };
        })
      );
      return res.render("admin/web_features", {
        features: featuresWithImageURLs,
        admin,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

    static get_all_features = async (req, res) => {
    try {
        const features = await Features.find({});
        const featuresWithImageURLs = await Promise.all(
            features.map(async (feature) => {
                const file = storage.bucket().file(feature.image);
                const [signedUrl] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                });
                return { ...feature.toObject(), image: signedUrl };
            })
        );
        return res.send({
            features: featuresWithImageURLs,
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
        const features = new Features({
          title: req.body.title,
          description: req.body.description,
          image: imageUrl,
        });
        await features.save();
        return res.send({
          message: "Feature Added Successfully",
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

        const feature = await Features.findOne({_id: req.body.id});
    
     // Delete the image from Firebase Storage
     const filePath = feature.image;
     const file = bucket.file(filePath);
     await file.delete();

     await Features.findByIdAndDelete({_id: req.body.id});

      return res.send({
        message: "Features Deleted Successfully",
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

module.exports = FeaturesController;
