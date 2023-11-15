const Homevideo2 = require("../../models/Homevideo2");
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
    const filePath = `homevideo2/${fileName}`;
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
    throw new Error("Error uploading video to Firebase Storage");
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: videoFilter,
}).single("video");

class Homevideo2Controller {
  static add_homevideo = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).send({
            error: true,
            message: err,
          });
        }
        const title = req.body.title;
        const video = await uploadVideoToFirebase(req.file);

        const homevideo2 = await Homevideo2.create({
          title,
          video,
        });

        await homevideo2.save();

        return res.send({
          error: false,
          message: "HomeVideo2 added successfully",
        });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static list = async(req, res) => {
        try{
            const data = await Homevideo2.find({})
            res.json(data)
        }
        catch(err){console.log(err)}
  }
}

module.exports = Homevideo2Controller;
