const router = require("express").Router();
const UserContactInfoController = require("../../controllers/app/userContactInfoController");

router.post("/add", UserContactInfoController.add);

module.exports = router;