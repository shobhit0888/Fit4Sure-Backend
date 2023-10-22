const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const paymentController = require("../../controllers/admin/paymentController");

router.get("/list", NotLoggedIn, paymentController.list);

module.exports = router;
