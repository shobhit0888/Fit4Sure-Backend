const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const postController = require("../../controllers/app/postController");

router.post("/add",auth, postController.add_post);
router.get("/all", postController.get_all_post);
router.get("/:postId", postController.get_post_by_id);
router.get("/category/:category", postController.get_post_by_category)
router.post("/:postId/like",auth, postController.like_post);
router.post("/:postId/unlike",auth, postController.unlike_post);
router.post("/:postId/comment",auth, postController.comment_post);
router.delete("/:postId",auth, postController.delete_post);

module.exports = router;
