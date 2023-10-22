const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const ContactController = require("../../controllers/admin/contactController");

router.get("/add", ContactController.list);
router.get("/list", ContactController.contactList);
router.post("/add", ContactController.add);
router.post("/delete", ContactController.delete);

module.exports = router;
