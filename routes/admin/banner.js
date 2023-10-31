const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const BannerController = require("../../controllers/admin/bannerController");

router.get("/list", BannerController.list);
router.post("/add", BannerController.add);
router.post("/delete", BannerController.delete);

module.exports = router;
