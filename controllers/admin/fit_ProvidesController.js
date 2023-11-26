const Fit_Provides = require("../../models/Fit_Provides");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const Adminauth = require("../../models/Adminauth");

const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/fit_provides"),
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

class Fit_ProvidesController {
  static list = async (req, res) => {
    try {
      const fit_provides = await Fit_Provides.find();
      const admin = await Adminauth.find({});
      return res.render("admin/fit_provides", {
        fit_provides,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
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
        const fit_provides = Fit_Provides({
          title: req.body.title,
          image: req.file.filename ? req.file.filename : null,
        });
        await fit_provides.save();
        return res.send({
          message: "Fit_Provides added successfully",
          status: true,
          statusCode: 200,
          success: true,
        });
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };
  static delete = async (req, res) => {
    try {
      const fit_provides = await Fit_Provides.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(
        root + "/public/uploads/fit_provides/" + fit_provides.image
      );
      await fit_provides.delete();
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

module.exports = Fit_ProvidesController;
