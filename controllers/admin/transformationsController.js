const Transformations = require("../../models/Transformations");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Adminauth = require("../../models/Adminauth");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");

const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/transformations"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage,
  fileFilter: imageFilter,
}).fields([
  {
    name: "before_image",
    maxCount: 1,
  },
  {
    name: "after_image",
    maxCount: 1,
  },
]);

class TransformationsController {
  static list = async (req, res) => {
    try {
      const admin = await Adminauth.find({});
      const transformations = await Transformations.find();
      return res.render("admin/transformations", {
        transformations,
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
        const transformations = Transformations({
          before_image: req.files.before_image[0].filename,
          after_image: req.files.after_image[0].filename,
        });
        await transformations.save();
        // console.log(transformations);
        return res.send({
          message: "Transformation added successfully",
          status: 200,
          success: true,
        });
      });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static delete = async (req, res) => {
    try {
      const transformations = await Transformations.findOne({
        _id: req.body.id,
      });
      // return console.log(transformations);
      fs.unlinkSync(
        path.join(
          root,
          "/public/uploads/transformations/" + transformations.before_image
        )
      );
      fs.unlinkSync(
        path.join(
          root,
          "/public/uploads/transformations/" + transformations.after_image
        )
      );

      await Transformations.deleteOne({
        _id: transformations.id,
      });
      return res.send({
        message: "Transformation deleted successfully",
        status: 200,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

module.exports = TransformationsController;
