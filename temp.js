const express = require("express");
const admin = require("firebase-admin");
const multer = require("multer");
const serviceAccount = require("./fit4sure-a1bf3-firebase-adminsdk-paul1-82c4340ab6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "fit4sure-a1bf3.appspot.com",
});

const bucket = admin.storage().bucket();

const app = express();
const port = 3000;

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = Date.now() + "-" + file.originalname;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.error(error);
      res.status(500).send("Error uploading file.");
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      res
        .status(200)
        .send(`File uploaded successfully. Public URL: ${publicUrl}`);
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
