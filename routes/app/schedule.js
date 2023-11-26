const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const scheduleController = require("../../controllers/app/scheduleController");

router.get("/",auth, scheduleController.get_schedule);

module.exports = router;