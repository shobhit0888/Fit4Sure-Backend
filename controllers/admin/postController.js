const Post = require("../../models/Post");
const User = require("../../models/User");
const Adminauth = require("../../models/Adminauth");
const path = require("path");
const fs = require("fs");
const root = process.cwd();
const firebaseApp = require("../../firebase");

const storage = firebaseApp.storage();
const bucket = storage.bucket();

class postController {
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

  static post_comments = async (req, res) => {
    try{
      const posts = await Post.find().populate("user_id") .populate("comments.user");
      const admin = await Adminauth.find({});

      return res.render("admin/post_comments", { posts, admin });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

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

module.exports = postController;
