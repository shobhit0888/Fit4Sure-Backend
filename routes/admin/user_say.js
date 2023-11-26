const router = require("express").Router();
const user_sayController = require("../../controllers/admin/user_sayController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

router.get("/list", NotLoggedIn, user_sayController.list);
router.post("/add", NotLoggedIn, user_sayController.add);
router.post("/edit", NotLoggedIn, user_sayController.update);
router.post("/delete", NotLoggedIn, user_sayController.delete);

module.exports = router;