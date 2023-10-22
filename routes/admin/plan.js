const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const PlanController = require("../../controllers/admin/planController");

router.get("/list", NotLoggedIn, PlanController.list);
router.get("/all", PlanController.all);
router.post("/add", NotLoggedIn, PlanController.add);
router.post("/delete", NotLoggedIn, PlanController.delete);

module.exports = router;
