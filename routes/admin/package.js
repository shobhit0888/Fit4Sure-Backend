const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const PackageController = require("../../controllers/admin/packageController");

router.get("/list", NotLoggedIn, PackageController.list);
router.post("/add", NotLoggedIn, PackageController.add);
router.post("/delete", NotLoggedIn, PackageController.delete);


module.exports = router;
