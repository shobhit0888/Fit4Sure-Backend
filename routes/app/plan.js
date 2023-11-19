const { auth } = require("../../middlewares/Appauth");
const router = require("express").Router();

const planController = require("./../../controllers/app/planController")
router.post("/selectplan", auth, planController.selectPlan)

module.exports = router;