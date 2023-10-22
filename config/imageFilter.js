const imageFilter = function (req, file, cb) {
  // Accept image files
  if (
    file.originalname.match(/\.(jpg|jpeg|png)$/i) ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else if (file.originalname.match(/\.(svg)$/i)) {
    // Accept SVG files
    cb(null, true);
  } else {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
};

module.exports = imageFilter;

