const router = require("express").Router();
const NotificationController = require("../../controllers/app/notificationController");
const { auth } = require("../../middlewares/Appauth");

router.get("/get", auth, NotificationController.get);

module.exports = router;
