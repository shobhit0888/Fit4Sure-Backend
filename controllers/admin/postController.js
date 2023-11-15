const Post = require("../../models/Post");
const User = require("../../models/User");
const Adminauth = require("../../models/Adminauth");
const path = require("path");
const fs = require("fs");
const root = process.cwd();
const firebaseApp = require("../../firebase");
const multer = require("multer");
const imageFilter = require('../../config/imageFilter')
const storage = firebaseApp.storage();
const bucket = storage.bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = async (imageFile) => {
  try {
    const fileName = generateUniqueFileName(imageFile.originalname);
    const filePath = `posts/${fileName}`;
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
      writeStream.on("finish", async () => {
      const expiration = new Date(Date.now() + 60 * 60 * 1000);
         const [url] = await file.getSignedUrl({
           action: "read",
           expires: "03-01-2500" // Set expires to Infinity for no expiration
         });

        resolve(url);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error("Error uploading image to Firebase Storage");
  }
};

class postController {
  static add = async(req, res) => {
    try{
        upload(req, res, async (err) => {
          if (err) {
            return res.status(400).send({
              error: true,
              message: err.message,
            });
          }

          if(req.file)
          {
            const imageUrl = await uploadImageToFirebase(req.file);
            const { text, Trainer } = req.body;

            let post = {
              image: imageUrl,
              text: text,
              Trainer: Trainer
            };

            let saveObj = post;
            await Post.create(saveObj);

            res.json({message: "post added", post})
          }
          else{
            res.json({message: "image not added"})
          }
        })
    }
    catch(err){console.log(err)}
  }
  static list = async (req, res) => {
    const post = await Post.find().populate("user_id");
    const admin = await Adminauth.find({});
    const postWithImageURLs = await Promise.all(
      post.map(async (post) => {
        if(!post.image) return post;
        const file = storage.bucket().file(post.image);
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
        return { ...post.toObject(), image: signedUrl };
      })
    );
    return res.render("admin/post-list", { post: postWithImageURLs, admin });
  };

  // static post_comments = async (req, res) => {
  //   try{
  //     const posts = await Post.find().populate("user_id") .populate("comments.user");
  //     const admin = await Adminauth.find({});

  //     return res.render("admin/post_comments", { posts, admin });
  //   } catch (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .send("Something went wrong please try again later");
  //   }
  // };

  static delete = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.body.id });

      // Delete the image from Firebase Storage
      const filePath = post.image;
      const file = bucket.file(filePath);
      await file.delete();

      await Post.findByIdAndDelete({ _id: req.body.id });

      return res.send({
        message: "Post Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await Post.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: Post.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "Post status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");

module.exports = postController;
