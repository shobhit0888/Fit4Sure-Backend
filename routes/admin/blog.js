const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const BlogController = require("../../controllers/admin/BlogController");

router.get("/list", NotLoggedIn, BlogController.list);
router.get("/all", BlogController.get_all_blogs);
router.post("/add", BlogController.add);
router.post("/delete", NotLoggedIn, BlogController.delete);

module.exports = router;
