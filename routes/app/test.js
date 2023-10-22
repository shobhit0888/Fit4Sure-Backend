const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const testController = require("../../controllers/app/testController");

router.post("/upload", auth, testController.upload_test);

module.exports = router;
