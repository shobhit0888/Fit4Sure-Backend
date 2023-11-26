const Food_Type = require('../../models/Food_Type');
const Adminauth = require('../../models/Adminauth');
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class Food_TypeController {
    static list = async (req, res) => {
        try {
            const food_types = await Food_Type.find();
            const admin = await Adminauth.find({});
            res.render('admin/food_type', { food_types, admin });
        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while retrieving food_types."
            })
        }
    }

    static add = async (req, res) => {
        try {
            upload(req, res, async function (err) {
            const food_type = new Food_Type({
                food_name: req.body.food_name,
                food_image: req.file.filename,
            });
            const data = await food_type.save();
            return res.send({
                error: false,
                message: "Food Type added successfully",

            });
        
        });
        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while creating food_type."
            })
        }
    }

    static delete = async (req, res) => {
        try {
            
            const food_type = await Food_Type.findOne({
                _id: req.body.id,
            });
            fs.unlinkSync(path.join(root, "/public/uploads/food_types/" + food_type.food_image));
            await Food_Type.deleteOne({
                _id: food_type._id,
            });
            res.redirect('/admin/food_type');
        } catch (error) {
            res.status(500).send
            return res.send({
                message: error.message || "Some error occurred while deleting food_type."
            })
        }
    }
}
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/uploads/food_types/"),
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
  }).single("food_image");

module.exports = Food_TypeController;