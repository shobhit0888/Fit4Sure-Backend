const router = require("express").Router();
const MainController = require("../../controllers/admin/mainController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

router.get("/", MainController.main);
router.get(
  "/admin/notification/list",
  NotLoggedIn,
  MainController.notification_list
);
router.post(
  "/admin/notification/add",
  NotLoggedIn,
  MainController.notification_add
);

module.exports = router;
