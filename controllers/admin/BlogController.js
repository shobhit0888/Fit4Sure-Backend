const Blog = require("../../models/Blog");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const imageFilter = require("../../config/imageFilter");;
const firebaseApp = require("../../firebase");

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
    const filePath = `blogs/${fileName}`;
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

class BlogController {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const blog = await Blog.find({});
      const blogWithImageURLs = await Promise.all(
        blog.map(async (blog) => {
          const file = storage.bucket().file(blog.image);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return { ...blog.toObject(), image: signedUrl };
        })
      );
      return res.render("admin/blog-list", {
        blog: blogWithImageURLs,
        admin,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static get_all_blogs = async (req, res) => {
    try {
      const blog = await Blog.find({});
      const blogWithImageURLs = await Promise.all(
        blog.map(async (blog) => {
          const file = storage.bucket().file(blog.image);
          const [signedUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          return { ...blog.toObject(), image: signedUrl };
        })
      );
      return res.send({
        blog: blogWithImageURLs,
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
        const blog = new Blog({
          heading : req.body.heading,
          description: req.body.description,
          image: imageUrl,
        });
        await blog.save();
        return res.send({
          message: "Blog Added Successfully",
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
      const blog = await Blog.findOne({ _id: req.body.id });

      // Delete the image from Firebase Storage
      const filePath = blog.image;
      const file = bucket.file(filePath);
      await file.delete();

      await Blog.findByIdAndDelete({ _id: req.body.id });

      return res.send({
        message: "Blog Deleted Successfully",
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

module.exports = BlogController;
