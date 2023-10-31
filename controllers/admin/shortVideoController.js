const ShortVideo = require("../../models/ShortVideo");
const Adminauth = require("../../models/Adminauth");
const firebaseApp = require("../../firebase");
const multer = require("multer");
const videoFilter = require("../../config/videoFilter");

const storage = firebaseApp.storage();

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadVideoToFirebase = async (videoFile) => {
  try {
    const fileName = generateUniqueFileName(videoFile.originalname);
    const filePath = `shortVideo/${fileName}`;
    const file = bucket.file(filePath);

    // Create a write stream to upload the video file
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: videoFile.mimetype,
      },

    });

    // Pipe the video file to the write stream
    writeStream.end(videoFile.buffer);

    // Handle the completion of the upload

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve(filePath);
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    throw new Error("Error uploading video to Firebase Storage");
  }
};

class ShortvideoController {
  static list_shortVideo = async (req, res) => {
    try {
      const shortVideo = await ShortVideo.find({})
      const admin = await Adminauth.find();
      const shortVideoWithVideoURLs = await Promise.all(
        shortVideo.map(async (shortVideo) => {
          const file = storage.bucket().file(shortVideo.video);
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
          });
          return {
            ...shortVideo.toObject(),
            video: signedUrl,
          };
        })
      );
      return res.render("admin/shortVideo", { shortVideo: shortVideoWithVideoURLs, admin });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  static add_shortVideo = async (req, res) => {
    try{
      upload(req, res, async (err) => {

        if (err) {
          console.log(err)
          return res.status(400).send({
            error: true,
            message: err,
            
          });
        }
        const { title } = req.body;
        const video = await uploadVideoToFirebase(req.file);

        const shortVideo = await ShortVideo.create({
          title,
          video,
        });

        await shortVideo.save();

        return res.send({
          error: false,
          message: "ShortVideo added successfully",
        });
      }
      );
    }
    catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }

  }

  static delete_shortVideo = async (req, res) => {
    try{
      const shortvideo = await ShortVideo.findById(req.body.id);

      // Delete the video from Firebase Storage
     const filePath = shortvideo.video;
     const file = bucket.file(filePath);
     await file.delete();

      await ShortVideo.findByIdAndDelete(req.body.id);

      return res.send({
        error: false,
        message: "ShortVideo deleted successfully",
      });
    }
    catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  }

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await ShortVideo.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: ShortVideo.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "ShortVideo status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: videoFilter,
}).single("video");

module.exports = ShortvideoController;
