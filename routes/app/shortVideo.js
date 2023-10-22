const ShortVideoController = require("../../controllers/app/shortVideoController");
const { auth } = require("../../middlewares/Appauth");
const router = require("express").Router();

router.get("/all", ShortVideoController.get_all_shortVideo);
router.post("/:videoId/like", auth, ShortVideoController.shortvideo_like);
router.post("/:videoId/unlike", auth, ShortVideoController.shortvideo_unlike);

module.exports = router;
