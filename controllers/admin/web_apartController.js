const Web_Apart = require("../../models/Web_Apart")
const Adminauth = require("../../models/Adminauth")
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

class Web_ApartController{
    static list = async (req, res) => {
        try {
            const web_apart = await Web_Apart.find()
            const admin = await Adminauth.find({})
            return res.render("admin/web_apart", {
                web_apart,
                admin,
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message : "Something went wrong please try again later"})
        }
    }

    static add = async (req, res) => {
        try{
            upload(req, res, async function (err) {
                const web_apart = new Web_Apart({
                    image : req.file.filename,
                    description : req.body.description
                })
                await web_apart.save()
                return res.send({message : "Web Apart Added Successfully"})
            }
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json({message : "Something went wrong please try again later"})
        }
    }

    static delete = async (req, res) => {
        try {
            await Web_Apart.findOneAndDelete({
                _id : req.body.id
            })
            return res.send({message : "Web Apart Deleted Successfully"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message : "Something went wrong please try again later"})
        }
    }

}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/uploads/Web_apart/"),
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
  
  module.exports = Web_ApartController
