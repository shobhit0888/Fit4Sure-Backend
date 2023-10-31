const ShortvideoController = require("../../controllers/admin/shortVideoController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const router = require("express").Router();

router.post("/add", ShortvideoController.add_shortVideo);
router.get("/list", NotLoggedIn, ShortvideoController.list_shortVideo);
router.post("/delete", NotLoggedIn, ShortvideoController.delete_shortVideo);
router.post("/approved", NotLoggedIn, ShortvideoController.Approved);

module.exports = router;
