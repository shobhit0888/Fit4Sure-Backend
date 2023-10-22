const router = require("express").Router();
const fit_provides = require("../../controllers/admin/fit_ProvidesController");

router.get("/list", fit_provides.list);
router.post("/add", fit_provides.add);
router.post("/delete", fit_provides.delete);

module.exports = router;
