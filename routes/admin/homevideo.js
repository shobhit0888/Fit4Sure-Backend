const HomevideoController = require("../../controllers/admin/HomevideoController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const router = require("express").Router();

router.post("/add", HomevideoController.add_homevideo);
router.get("/list", HomevideoController.list);


module.exports = router;
