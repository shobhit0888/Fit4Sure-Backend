const Banner = require("../../models/Banner");
const About = require("../../models/About");
const Contact = require("../../models/Contact");
const Faq = require("../../models/Faq");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const Slider = require("../../models/Slider");
const TermsCondition = require("../../models/TermsCondition");
const User = require("../../models/User");
const Blog = require("../../models/Blog");
const Coupon = require("../../models/Coupon");
const Order = require("../../models/Order");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Likes = require("../../models/Likes");
const Package = require("../../models/Package");
const PackageInclude = require("../../models/PackageInclude");
const Plan = require("../../models/Plan");
const Classes = require("../../models/Classes");
const Documents = require("../../models/Documents");
const ShortVideo = require("../../models/ShortVideo");
const Shortvideo_Likes = require("../../models/Shortvideo_Likes");
const Shortvideo_Comments = require("../../models/Shortvideo_Comments");
const Support = require("../../models/Support");
const Notification = require("../../models/Notification");
const Saved = require("../../models/Saved");
const calculate = require("fitness-health-calculations");
const baseurl = process.env.URL;
var ObjectId = require("mongodb").ObjectID;

class ApiController {
  static blog = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/blog/";
      const blog = await Blog.find({});
      // sending notification start
      const notification = Notification({
        type: "Blog-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Blog-added");

      // sending notification end
      return res.send({
        blog,
        mediaUrl,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static banner = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/banners/";
      const banners = await Banner.find();
      // sending notification start
      const notification = Notification({
        type: "Banner-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Banner-added");

      // sending notification end
      return res.status(200).send({ banners, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static slider = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/sliders/";
      const sliders = await Slider.find();
      // sending notification start
      const notification = Notification({
        type: "Slider-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Slider-added");

      // sending notification end
      return res.status(200).send({ sliders, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static about = async (req, res) => {
    try {
      const data = await About.find({});
      // sending notification start
      const notification = Notification({
        type: "Aboutus-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Aboutus-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static contact = async (req, res) => {
    try {
      const data = await Contact.find({});
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static faq = async (req, res) => {
    try {
      const data = await Faq.find();
      // sending notification start
      const notification = Notification({
        type: "Faq-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Faq-added");

      // sending notification end
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static privacypolicy = async (req, res) => {
    try {
      const data = await PrivacyPolicy.find({});
      // sending notification start
      const notification = Notification({
        type: "PrivacyPolicy-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("PrivacyPolicy-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static termscondition = async (req, res) => {
    try {
      const data = await TermsCondition.find({});
      // sending notification start
      const notification = Notification({
        type: "termscondition-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("termscondition-added");

      // sending notification end
      return res.send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static users = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/profile/";
      const users = await User.find({});
      return res.send({ users, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static orders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("user_id package_id plan_id")
        .sort({
          createdAt: -1,
        });
      return res.send(orders);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static coupons = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/coupon/";
      const coupon = await Coupon.find({});
      // sending notification start
      const notification = Notification({
        type: "Coupon-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Coupon-added");

      // sending notification end
      return res.send({ coupon, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static posts = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/post/";
      const post = await Post.find({}).populate("user_id").lean();
      // find this post comments
      const comment = await Comment.find({
        post_id: {
          $in: post.map((item) => item._id),
        },
      }).populate("user_id post_id");
      const likes = await Likes.find({
        post_id: {
          $in: post.map((item) => item._id),
        },
      }).populate("user_id post_id");
      // sending notification start
      const notification = Notification({
        type: "Post-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Post-added");

      // sending notification end
      return res.send({ post, comment, likes, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static get_all_posts = async (req, res) => {
    let mediaUrl = baseurl + "/uploads/post/";
    const body = req.body;
    let msg = "Something went wrong please try again later";
    let findCondition = {};
    if (req.body && req.body.searchText && req.body.searchText != "") {
      findCondition.text = {
        $regex: ".*" + req.body.searchText + ".*",
        $options: "i",
      };
    }
    try {
      await Post.aggregate([
        {
          $lookup: {
            from: "likes",
            let: {
              post_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $and: [{ $eq: ["$post_id", "$$post_id"] }] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { post_id: "$post_id", user_id: "$user_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  ],
                  as: "userDetails",
                },
              },
              { $unwind: "$userDetails" },
            ],
            as: "likes",
          },
        },
        {
          $lookup: {
            from: "likes",
            let: {
              post_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$post_id", "$$post_id"] }],
                  },
                },
              },
            ],
            as: "likes_by_user",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: {
              post_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $and: [{ $eq: ["$post_id", "$$post_id"] }] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { post_id: "$post_id", user_id: "$user_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { user_name: 1, photo: 1, _id: 1, email: 1 } },
                  ],
                  as: "userDetails",
                },
              },
              { $unwind: "$userDetails" },
            ],
            as: "comments",
          },
        },

        {
          $project: {
            liked_by_me: {
              $switch: {
                branches: [{ case: { $gt: ["$likes_by_user", []] }, then: 1 }],
                default: 0,
              },
            },
            image: 1,
            text: 1,
            datetime: 1,
            created_at: 1,
            likes: 1,
            comments: 1,
            total_likes: { $size: "$likes" },
            total_comments: { $size: "$comments" },
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
        {
          $match: findCondition,
        },
      ]).exec(function (err, data) {
        return res.json({
          message: "Success",
          success: true,
          data: data,
          mediaUrl: mediaUrl,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
  static likes = async (req, res) => {
    try {
      const likes = await Likes.find({
        post_id: req.body.post_id,
      }).populate("user_id post_id");
      return res.send(likes);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static packages = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/package/";
      const packages = await Package.find({}).lean();
      const package_include = await PackageInclude.find({
        package_id: {
          $in: packages.map((item) => item._id),
        },
      })
        .populate("package_id")
        .lean();
      const plan = await Plan.find({
        package_id: {
          $in: packages.map((item) => item._id),
        },
      }).populate("package_id");
      // sending notification start
      const notification = Notification({
        type: "Package-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Package-added");

      // sending notification end
      return res.send({ packages, package_include, plan, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static classes = async (req, res) => {
    try {
      const classes = await Classes.find({}).populate("user_id");
      // sending notification start
      const notification = Notification({
        type: "Classes-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Classes-added");

      // sending notification end
      return res.send(classes);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static documents = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/documents/";
      const documents = await Documents.find({}).populate("class_id");
      return res.send({ documents, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static shortvideos = async (req, res) => {
    try {
      let mediaUrl = baseurl + "/uploads/shortvideo/";
      const shortvideo = await ShortVideo.find({}).populate("user_id").lean();
      const shortvideo_comment = await Shortvideo_Comments.find({
        shortvideo_id: {
          $in: shortvideo.map((item) => item._id),
        },
      })
        .populate("user_id shortvideo_id")
        .sort({
          createdAt: -1,
        });
      // sending notification start
      const notification = Notification({
        type: "shortvideo-added",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("shortvideo-added");

      // sending notification end
      return res.send({ shortvideo, shortvideo_comment, mediaUrl });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static get_all_shortvideos = async (req, res) => {
    let mediaUrl = baseurl + "/uploads/shortvideo/";
    const body = req.body;
    let msg = "Something went wrong please try again later";
    let findCondition = {};
    if (req.body && req.body.searchText && req.body.searchText != "") {
      findCondition.title = {
        $regex: ".*" + req.body.searchText + ".*",
        $options: "i",
      };
    }
    try {
      await ShortVideo.aggregate([
        {
          $lookup: {
            from: "shortvideo_likes",
            let: {
              shortvideo_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$shortvideo_id", "$$shortvideo_id"] }],
                  },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { shortvideo_id: "$shortvideo_id", user_id: "$user_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                  ],
                  as: "userDetails",
                },
              },
              { $unwind: "$userDetails" },
            ],
            as: "likes",
          },
        },
        {
          $lookup: {
            from: "shortvideo_likes",
            let: {
              shortvideo_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$shortvideo_id", "$$shortvideo_id"] }],
                  },
                },
              },
            ],
            as: "likes_by_user",
          },
        },
        {
          $lookup: {
            from: "shortvideo_comments",
            let: {
              shortvideo_id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$shortvideo_id", "$$shortvideo_id"] }],
                  },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { shortvideo_id: "$shortvideo_id", user_id: "$user_id" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { user_name: 1, photo: 1, _id: 1, email: 1 } },
                  ],
                  as: "userDetails",
                },
              },
              { $unwind: "$userDetails" },
            ],
            as: "comments",
          },
        },

        {
          $project: {
            liked_by_me: {
              $switch: {
                branches: [{ case: { $gt: ["$likes_by_user", []] }, then: 1 }],
                default: 0,
              },
            },
            description: 1,
            video: 1,
            created_at: 1,
            likes: 1,
            comments: 1,
            total_likes: { $size: "$likes" },
            total_comments: { $size: "$comments" },
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
        {
          $match: findCondition,
        },
      ]).exec(function (err, data) {
        return res.json({
          message: "Success",
          success: true,
          data: data,
          mediaUrl: mediaUrl,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
  static shortvideo_likes = async (req, res) => {
    try {
      const shortvideo_likes = await Shortvideo_Likes.find({
        shortvideo_id: req.body.shortvideo_id,
      }).populate("user_id shortvideo_id");
      return res.send(shortvideo_likes);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static saved_videos = async (req, res) => {
    try {
      const saved_video = await Saved.find({})
        .populate("user_id shortvideo_id")
        .sort({
          createdAt: -1,
        });
      return res.send(saved_video);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static calculate_basal_metabolic_rate = async (req, res) => {
    try {
      const data = req.body;
      if (!data.gender) {
        return res.status(400).send({
          status: 400,
          key: "gender",
          message: "gender is required",
        });
      }
      if (!data.age) {
        return res.status(400).send({
          status: 400,
          key: "age",
          message: "age is required",
        });
      }
      if (!data.height) {
        return res.status(400).send({
          status: 400,
          key: "height",
          message: "height is required(in FEETS or CENTIMETERS)",
        });
      }
      if (!data.weight) {
        return res.status(400).send({
          status: 400,
          key: "weight",
          message: "weight is required(in POUNDS or KILOGRAMS)",
        });
      }
      let myBmr = await calculate.bmr(
        data.gender,
        Number(data.age),
        Number(data.height),
        Number(data.weight)
      );

      return res.send({ result: myBmr, value: "number of calories" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static calculate_total_daily_energy_expenditure = async (req, res) => {
    try {
      const data = req.body;
      if (!data.gender) {
        return res.status(400).send({
          status: 400,
          key: "gender",
          message: "gender is required",
        });
      }
      if (!data.age) {
        return res.status(400).send({
          status: 400,
          key: "age",
          message: "age is required",
        });
      }
      if (!data.height) {
        return res.status(400).send({
          status: 400,
          key: "height",
          message: "height is required(in FEETS or CENTIMETERS)",
        });
      }
      if (!data.weight) {
        return res.status(400).send({
          status: 400,
          key: "weight",
          message: "weight is required(in POUNDS or KILOGRAMS)",
        });
      }
      if (!data.activity_level) {
        return res.status(400).send({
          status: 400,
          key: "activity_level",
          message: "activity_level is required",
        });
      }
      let myBmr = await calculate.tdee(
        data.gender,
        Number(data.age),
        Number(data.height),
        Number(data.weight),
        data.activity_level
      );

      return res.send({ result: myBmr, value: "number of calories" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static calculate_total_daily_caloric_needs = async (req, res) => {
    try {
      const data = req.body;
      if (!data.gender) {
        return res.status(400).send({
          status: 400,
          key: "gender",
          message: "gender is required",
        });
      }
      if (!data.age) {
        return res.status(400).send({
          status: 400,
          key: "age",
          message: "age is required",
        });
      }
      if (!data.height) {
        return res.status(400).send({
          status: 400,
          key: "height",
          message: "height is required(in FEETS or CENTIMETERS)",
        });
      }
      if (!data.weight) {
        return res.status(400).send({
          status: 400,
          key: "weight",
          message: "weight is required(in POUNDS or KILOGRAMS)",
        });
      }
      if (!data.activity_level) {
        return res.status(400).send({
          status: 400,
          key: "activity_level",
          message: "activity_level is required",
        });
      }
      if (!data.goal) {
        return res.status(400).send({
          status: 400,
          key: "goal",
          message: "goal is required",
        });
      }
      if (!data.approach) {
        return res.status(400).send({
          status: 400,
          key: "approach",
          message: "approach is required",
        });
      }
      let myBmr = await calculate.caloricNeeds(
        data.gender,
        Number(data.age),
        Number(data.height),
        Number(data.weight),
        data.activity_level,
        data.goal,
        data.approach
      );

      return res.send({ result: myBmr, value: "number of calories" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static calculate_ideal_weight = async (req, res) => {
    try {
      const data = req.body;
      if (!data.gender) {
        return res.status(400).send({
          status: 400,
          key: "gender",
          message: "gender is required",
        });
      }
      if (!data.height) {
        return res.status(400).send({
          status: 400,
          key: "height",
          message: "height is required(in FEETS or CENTIMETERS)",
        });
      }

      let myBmr = await calculate.idealBodyWeight(
        Number(data.height),
        data.gender
      );

      return res.send({ result: myBmr, value: "ideal weight" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static get_activity_level_dropdown = async (req, res) => {
    try {
      let data = [
        {
          value: "little to no exercise + work a desk job",
          title: "sedentary",
        },
        {
          value: "light",
          title: "light exercise 1-3 days/week",
        },
        {
          value: "moderate",
          title: "moderate exercise 3-5 days/week",
        },
        {
          value: "high",
          title: "heavy exercise 6-7 days/week",
        },
        {
          value: "extreme",
          title: "very heavy exercise, hard labor job, training 2x/day",
        },
      ];

      return res.send({ result: data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static get_goal_dropdown = async (req, res) => {
    try {
      let data = [
        {
          value: "weightloss",
          title: "reduction",
        },
        {
          value: "maintain",
          title: "maintain current weight",
        },
        {
          value: "gain",
          title: "gain weight",
        },
      ];

      return res.send({ result: data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static get_approach_dropdown = async (req, res) => {
    try {
      let data = [
        {
          value: "very slow weightloss/gain",
          title: "slow",
        },
        {
          value:
            "normal weightloss/gain, this is the default and recommended value",
          title: "normal",
        },
        {
          value: "agressive weightloss/gain",
          title: "agressive",
        },
        {
          value:
            "very agressive weightloss/gain, only recommended for professional athletes",
          title: "very agressive",
        },
      ];

      return res.send({ result: data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static support_form = async (req, res) => {
    const body = req.body;
    let msg = "Something went wrong please try again later";
    let findCondition = {};
    if (!req.body.name) {
      return res.json({
        message: "Please enter name",
        success: false,
      });
    }
    if (!req.body.email) {
      return res.json({
        message: "Please enter email",
        success: false,
      });
    }
    if (!req.body.mobile_number) {
      return res.json({
        message: "Please enter mobile_number",
        success: false,
      });
    }
    if (!req.body.text) {
      return res.json({
        message: "Please enter text",
        success: false,
      });
    }
    const user = req.login_user;
    if (!user) return res.status(401).send("User not found");
    try {
      const slider = Support({
        name: req.body.name,
        email: req.body.email,
        mobile_number: req.body.contactNumber,
        text: req.body.text,
        user_id: user._id,
      });
      let saveData = await slider.save();

      return res.json({
        message: "Support added successfully",
        success: true,
        data: saveData,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
}

module.exports = ApiController;
