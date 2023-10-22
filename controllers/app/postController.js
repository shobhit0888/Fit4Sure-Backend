const multer = require("multer");
const imageFilter = require("../../config/imageFilter");
const Post = require("../../models/Post");
const Notification = require("../../models/Notification");
require("dotenv").config();
const firebaseApp = require("../../firebase");

const bucket = firebaseApp.storage().bucket();

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

class postController {
  static add_post = async (req, res) => {
    try {
        upload(req, res, async (err) => {
          if (err) {
            return res.status(400).send({
              error: true,
              message: err.message,
            });
          }

          if(req.file){

          const imageUrl = await uploadImageToFirebase(req.file);

          const { text, category } = req.body;

          let post = {
            image: imageUrl,
            text: text,
            category: category,
            user_id: req.userId,
          };

          let saveObj = post;
          await Post.create(saveObj);

          let returnObj = {
            message: "Success",
            data: {
              image: imageUrl,
              text: text,
              category: category,
              user_id: req.userId,
            },
          };
          // sending notification start
          const notification = Notification({
            user: req.userId,
            type: "Post-added",
            data: {
              time: Date.now(),
            },
          });
          await notification.save();
          if (req.app.socket) req.app.socket.emit("Post-added");

          // sending notification end
          res.send(returnObj);
      } else {
          const { text, category } = req.body;

          let post = {
            text: text,
            category: category,
            user_id: req.userId,
          };

          let saveObj = post;
          await Post.create(saveObj);

          let returnObj = {
            message: "Success",
            data: {
              text: text,
              category: category,
              user_id: req.userId,
            },
          };
          // sending notification start
          const notification = Notification({
            user: req.userId,
            type: "Post-added",
            data: {
              time: Date.now(),
            },
          });
          await notification.save();
          if (req.app.socket) req.app.socket.emit("Post-added");

          // sending notification end
          res.send(returnObj);
        }
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .send("Something went wrong please try again later");
    }
  };

  //controller for getting all posts
  static get_all_post = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user")
        .populate("comments.user");
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  };

  //controller for getting post by category
  static get_post_by_category = async (req, res) => {
    try {
      const category = req.params.category;
      const posts = await Post.find({ category: category })
        .populate("user")
        .populate("comments.user");
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  };

  //controller for getting post by id
  static get_post_by_id = async (req, res) => {
    try {
      const postId = req.params.postId;

      const post = await Post.findById(postId)
        .populate("user")
        .populate("comments.user");

      if (post) {
        res.json(post);
      } else {
        return res.status(404).json({ msg: "Post not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve post" });
    }
  };

  static like_post = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.userId;

      // Find the post by ID and update its likes array with the user ID
      const post = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } }, // Use $addToSet to add the user ID only if it doesn't exist already
        { new: true }
      );

      res.status(200).json({ message: "Post liked", post });
    } catch (error) {
      console.error("Error liking the post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static unlike_post = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.userId;

      // Find the post by ID and update its likes array by removing the user ID
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } }, // Use $pull to remove the user ID from the array
        { new: true }
      );

      res.status(200).json({ message: "Post unliked", post });
    } catch (error) {
      console.error("Error unliking the post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static comment_post = async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;
    const userId = req.userId;

    try {
      const post = await Post.findById(postId).populate({
        path: "comments.user",
        model: "User",
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Create a new comment
      const newComment = {
        text: comment,
        user: userId,
      };

      // Add the comment to the post
      post.comments.push(newComment);

      await post.save();

      await post.populate("comments.user", "name").execPopulate();

      res
        .status(200)
        .json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static delete_post = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.userId;

      // Find the post by ID
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the user deleting the post is the owner of the post
      if (post.user_id.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      // Delete the image from Firebase Storage
      const filePath = post.image;
      const file = bucket.file(filePath);
      await file.delete();

      // Delete the post
      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting the post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");

module.exports = postController;
