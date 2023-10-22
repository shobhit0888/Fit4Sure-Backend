const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const { dashboardData } = require('../../controllers/admin/dashboardController')

router.get("/dashboard", NotLoggedIn, dashboardData);

module.exports = router;