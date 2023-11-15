const Homevideo2Controller = require("../../controllers/admin/Homevideo2Controller");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const router = require("express").Router();

router.post("/add", Homevideo2Controller.add_homevideo);
router.get("/list", Homevideo2Controller.list);


module.exports = router;
