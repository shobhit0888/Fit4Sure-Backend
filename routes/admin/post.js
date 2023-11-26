const router = require("express").Router();
const postController = require("../../controllers/admin/postController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

router.get("/list", NotLoggedIn, postController.list);
router.get("/comments", NotLoggedIn, postController.post_comments);
router.post("/delete", NotLoggedIn, postController.delete);
router.post("/approved", NotLoggedIn, postController.Approved);

module.exports = router;
