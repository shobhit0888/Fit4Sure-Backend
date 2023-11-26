const Coupon = require("../../models/Coupon");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");

class CouponController {
  static list = async (req, res) => {
    try {
      const coupon = await Coupon.find().sort({ created_at: -1 });
      const admin = await Adminauth.find({});
      return res.render("admin/coupons", { coupon, admin });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static add_coupon = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const coupon = Coupon({
          image: req.file.filename,
          coupon_name: req.body.coupon_name,
          coupon_code: req.body.coupon_code,
          valid_start_date: req.body.valid_start_date,
          valid_expiry_date: req.body.valid_expiry_date,
          status: req.body.status,
        });

        await coupon.save();
        return res.send({
          error: false,
          message: "Coupon added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const coupon = await Coupon.findOne({
        _id: req.body.editid,
      });

      await Coupon.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          coupon_name: req.body.editcoupon_name,
          coupon_code: req.body.editcoupon_code,
          valid_start_date: req.body.editvalid_start_date,
          valid_expiry_date: req.body.editvalid_expiry_date,
          status: req.body.editstatus,
          updated_at: Date.now(),
        }
      );

      return res.send({
        error: false,
        message: "Coupon updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const coupon = await Coupon.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(root + "/public/uploads/coupon/" + coupon.image);
      await Coupon.deleteOne({
        _id: coupon.id,
      });
      return res.send({
        error: false,
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}
module.exports = CouponController;

const storage = multer.diskStorage({
  destination: path.join(root, "/public/uploads/coupon"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: imageFilter,
}).single("image");
