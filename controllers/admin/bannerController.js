const Banner = require("../../models/Banner");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const moment = require("moment");

const firebaseApp = require("../../firebase"); 


const storage = firebaseApp.storage();

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = async (imageFile) => {
  try {
    const fileName = generateUniqueFileName(imageFile.originalname);
    const filePath = `banners/${fileName}`;
    const file = bucket.file(filePath);

    // Create a write stream to upload the image file
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Pipe the image file to the write stream
    writeStream.end(imageFile.buffer);

    // Handle the completion of the upload
    return new Promise((resolve, reject) => {
      writeStream.on("finish", async () => {
        const expiration = new Date(Date.now() + 60 * 60 * 1000);
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: expiration, // Set expires to Infinity for no expiration
        });

        resolve(url);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.log(error)
    throw new Error("Error uploading image to Firebase Storage");
  }
};


class BannerController {
  static list = async (req, res) => {
    try {
      let banners = await Banner.find();
      res.json(banners);
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({
            error: true,
            message: err.message,
          });
        }

        if (req.file) {
          const imageUrl = await uploadImageToFirebase(req.file);
          const {  basename } = req.body;

          let post = {
            image: imageUrl,
            basename: basename
          };

          let saveObj = post;
          await Banner.create(saveObj);

          res.json({ message: "Banner added", post });
        } else {
          res.json({ message: "image not added" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  static delete = async (req, res) => {
    try {
      const banner = await Banner.findOne({
        _id: req.body.id,
      });
      fs.unlinkSync(root + "/public/uploads/banners/" + banner.basename);
      await Banner.deleteOne({
        _id: banner.id,
      });
      return res.send({
        error: false,
        message: "Banner Deleted Successfully",
      });
    } catch (error) {
      return res.send("Something went wrong please try again later");
    }
  };
}
const formatData = (data) => {
  return new Promise(async (resolve, reject) => {
    for (var i in data) {
      data[i].created_at = moment(parseInt(data[i].created_at)).format(
        "DD MMM YYYY, HH:MM"
      );
      data[i].last_update_time = moment(
        parseInt(data[i].last_update_time)
      ).format("DD MMM YYYY, HH:MM");
    }
    resolve(data);
  });
};


const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
}).single("image");


module.exports = BannerController;
