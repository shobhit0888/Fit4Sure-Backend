const Web_services = require("../../models/Web_services");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class Web_servicesController {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const services = await Web_services.find({});
      return res.render("admin/web_services", {
        services,
        admin,
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
        const web_services = new Web_services({
          image: req.file.filename,
          title: req.body.title,
          description: req.body.description,
        });
        await web_services.save();
        return res.send({
          message: "Web Services Added Successfully",
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
      await Web_services.findOneAndDelete({
        _id: req.body.id,
      });
      return res.send({
        message: "Web Services Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/Web_services/"),
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

module.exports = Web_servicesController;
