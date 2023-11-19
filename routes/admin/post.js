const router = require("express").Router();
const postController = require("../../controllers/admin/postController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
router.post("/add", postController.add)
router.get("/list", postController.list);
// router.get("/comments", NotLoggedIn, postController.post_comments);
router.post("/delete", NotLoggedIn, postController.delete);
router.post("/aprooved",  postController.aproovepost);
router.get("/pending", postController.pending)
module.exports = router;
