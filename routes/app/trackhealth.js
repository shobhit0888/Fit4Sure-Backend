const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");

const trackhealthController = require("./../../controllers/app/trackhealthController")

router.post("/add", auth, trackhealthController.add)
module.exports = router;