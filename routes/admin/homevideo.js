const HomevideoController = require("../../controllers/admin/HomevideoController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const router = require("express").Router();

router.post("/add", NotLoggedIn, HomevideoController.add_homevideo);


module.exports = router;
