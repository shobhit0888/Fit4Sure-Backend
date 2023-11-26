const User = require("../../models/User");
const multer = require("multer");
const firebaseApp = require("../../firebase");
const docFilter = require("../../config/docFilter");

const bucket = firebaseApp.storage().bucket();

const generateUniqueFileName = (fileName) => {
  const uniqueId = Date.now().toString();
  const fileExtension = fileName.split(".").pop();
  return `${uniqueId}.${fileExtension}`;
};

const uploadImageToFirebase = (excelFile) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = generateUniqueFileName(excelFile.originalname);
      const filePath = `excel-sheets/${fileName}`;
      const file = bucket.file(filePath);

      // Create a write stream to upload the image file
      const writeStream = file.createWriteStream({
        metadata: {
          contentType: excelFile.mimetype,
        },
      });

      // Pipe the image file to the write stream
      writeStream.end(excelFile.buffer);

      // Handle the completion of the upload
      writeStream.on("finish", async () => {
        // Get the download URL
        try {
          const [url] = await file.getSignedUrl({
            action: "read",
            expires: "03-01-2500",
          });
          resolve({ filePath, downloadUrl: url });
        } catch (error) {
          reject(error);
        }
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

class testController {
  static upload_test = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // Handle multer errors (e.g., file size, unsupported file type)
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // Handle other errors
          return res.status(500).json({ error: "An error occurred" });
        }

        if (!req.file) {
          return res.status(400).json({ error: "No file received" });
        }

        const { filePath, downloadUrl } = await uploadImageToFirebase(req.file);

        const userId = req.userId;

        await User.findByIdAndUpdate(userId, { test: downloadUrl });

        return res.status(200).json({ message: "File uploaded successfully" });
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the file" });
    }
  };
}

module.exports = testController;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: docFilter,
}).single("file");
