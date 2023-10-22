const Package = require("../../models/Package");

const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");

class PackageController {
  static list = async (req, res) => {
    try {
      const packages = await Package.find({});
      const admin = await Adminauth.find({});
      return res.render("admin/package", { packages, admin });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
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
        const packages = Package({
          image: req.file.filename,
          title: req.body.title,
          description: req.body.description,
        });
        await packages.save();
        return res.send({
          error: false,
          message: "Package added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const packages = await Package.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(root + "/public/uploads/package/" + packages.image);
      await Package.deleteOne({
        _id: packages.id,
      });

      return res.send({
        error: false,
        message: "Package deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

 
}

module.exports = PackageController;

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/package/"),
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
