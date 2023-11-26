const router = require("express").Router();
const team = require("../../controllers/admin/teamController");

router.get("/list", team.list);
router.post("/add", team.add);
router.post("/delete", team.delete);
router.post("/edit", team.edit);

module.exports = router;
