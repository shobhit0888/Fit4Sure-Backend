const Classes = require("../../models/Classes");
const Documents = require("../../models/Documents");
const Trainer = require("../../models/Trainer");
const Adminauth = require("../../models/Adminauth");
const User = require("../../models/User");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const docFilter = require("../../config/docFilter");
const fs = require("fs");
const Category = require("../../models/Category");

class ClassController {
  static list = async (req, res) => {
    try {
      let classes = await Classes.find()
        .populate("user_id trainer_id")
        .populate({
          path: "category",
          populate: {
            path: "name",
            model: "Category",
          },
        });
      const user_id = await User.find().sort({
        created_at: -1,
      });
      const trainer_id = await Trainer.find().sort({
        created_at: -1,
      });
      const admin = await Adminauth.find();
      const categories = await Category.find().sort({ created_at: -1 });

      if (user_id.length > 0) {
        for (var i = 0; i < user_id.length; i++) {
          if (user_id[i].name && user_id[i].name != "") {
            user_id[i].name = user_id[i].name;
          } else {
            user_id[i].name = user_id[i].contactNumber;
          }
        }
      }

      return res.render("admin/classes", {
        classes,
        user_id,
        trainer_id,
        admin,
        categories,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static documents_list = async (req, res) => {
    try {
      let class_id = req.params && req.params.id ? req.params.id : "";
      let document = await Documents.find({ class_id: class_id }).sort({
        created_at: -1,
      });
      const admin = await Adminauth.find({});
      return res.render("admin/documents", {
        document,
        class_id,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      let meetingDate = req.body.date ? req.body.date : "";
      let meetingTime = req.body.time ? req.body.time : "";
      let meetingDateTIme = new Date(meetingDate + " " + meetingTime);

      const slider = Classes({
        datetime: meetingDateTIme,
        date: req.body.date ? req.body.date : "",
        time: req.body.time ? req.body.time : "",
        link: req.body.link ? req.body.link : "",
        meeting_id: req.body.meeting_id ? req.body.meeting_id : "",
        meeting_password: req.body.meeting_password
          ? req.body.meeting_password
          : "",
        user_id: req.body.user_id,
        trainer_id: req.body.trainer_id,
      });

      await slider.save();
      return res.send({
        error: false,
        message: "Class added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
  static add_documents = async (req, res) => {
    try {
      uploadDoc(req, res, async function (err) {
        // console.log(req.body);
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }
        const document = Documents({
          file: req.file.filename,
          type: req.body.type ? req.body.type : "",
          class_id: req.body.class_id ? req.body.class_id : "",
        });
        await document.save();
        return res.send({
          error: false,
          message: "Document added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const slider = await Classes.findOne({
        _id: req.body.id,
      });

      await Classes.deleteOne({
        _id: slider.id,
      });

      return res.send({
        error: false,
        message: "Class deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static delete_documents = async (req, res) => {
    try {
      const document = await Documents.findOne({
        _id: req.body.id,
      });

      await Documents.deleteOne({
        _id: document.id,
      });

      return res.send({
        error: false,
        message: "Document deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const sliders = await Classes.findOne({
        _id: req.body.editid,
      });

      await Classes.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          user_id: req.body.user_id,
          trainer_id: req.body.trainer_id,
          title: req.body.title,
          link: req.body.link,
          meeting_id: req.body.meeting_id,
          meeting_password: req.body.meeting_password,
          date: req.body.date,
          time: req.body.time,
          updated_at: Date.now(),
        }
      );
      return res.send({
        error: false,
        message: "Class updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "public/uploads/documents"),
  filename: function (req, file, cb) {
    var fileExt = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${fileExt}`);
  },
});

const uploadDoc = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: docFilter,
}).single("image");

module.exports = ClassController;
