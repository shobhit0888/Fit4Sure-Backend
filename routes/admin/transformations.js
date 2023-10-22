const router = require("express").Router();
const transformations = require("../../controllers/admin/transformationsController");

router.get("/list", transformations.list);
router.post("/add", transformations.add);
router.post("/delete", transformations.delete);

module.exports = router;
