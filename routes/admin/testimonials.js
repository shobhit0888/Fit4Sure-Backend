const router = require("express").Router();
const testimonials = require("../../controllers/admin/testimonialController");

router.get("/list", testimonials.list);
router.post("/add", testimonials.add);
router.post("/delete", testimonials.delete);

module.exports = router;
