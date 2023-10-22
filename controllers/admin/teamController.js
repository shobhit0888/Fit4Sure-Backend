const Team = require("../../models/Team");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const Adminauth = require("../../models/Adminauth");

const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/Team"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 5000000
  // },
  fileFilter: imageFilter,
}).single("image");

class TeamController {
  static list = async (req, res) => {
    try {
      const team = await Team.find();
      const admin = await Adminauth.find();
      res.render("admin/team", {
        team,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        status: 500,
        success: false,
      });
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an image");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }
        // console.log(req.file);
        // console.log(req.body);
        const team = Team({
          name: req.body.name,
          image: req.file.filename ? req.file.filename : null,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          experties: req.body.experties,
        });
        await team.save();
        return res.send({
          message: "Team member added successfully",
          status: 200,
          success: true,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        status: 500,
        success: false,
      });
    }
  };

  static edit = async (req, res) => {
    try {
      const id = req.body.editid;
      // return console.log(id);
      const team = await Team.findOne({
        _id: id,
      });
      await Team.updateOne(
        {
          _id: id,
        },
        {
          name: req.body.editname,
          facebook: req.body.editfacebook,
          twitter: req.body.edittwitter,
          instagram: req.body.editinstagram,
          experties: req.body.editexperties,
        }
      );
      return res.send({
        message: "Team member updated successfully",
        status: 200,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        status: 500,
        success: false,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const team = await Team.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(root + "/public/uploads/Team/" + team.image);
      await team.delete();
      return res.send({
        error: false,
        message: "Fit Provides deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
}

module.exports = TeamController;
