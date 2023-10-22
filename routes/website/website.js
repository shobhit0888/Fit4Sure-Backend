const router = require("express").Router();
const websiteController = require("../../controllers/website/websiteController");

router.get("/index", websiteController.index);
router.post("/food", websiteController.food);
router.get("/contact", websiteController.contact);
router.get("/aboutus", websiteController.aboutus);
router.get("/services", websiteController.services);
router.get("/service-details/:id", websiteController.service_details);
router.get("/careers", websiteController.careers);

router.post("/addcontact", websiteController.addcontact);

module.exports = router;
