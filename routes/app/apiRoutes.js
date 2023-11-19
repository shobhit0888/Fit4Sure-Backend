const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const ApiController = require("../../controllers/app/apiController");

router.get("/aboutus/list", auth, ApiController.about);
router.get("/banner/list", auth, ApiController.banner);
router.get("/contactus/list", auth, ApiController.contact);
router.get("/faq/list", auth, ApiController.faq);
router.get("/slider/list", auth, ApiController.slider);
router.get("/privacypolicy/list", auth, ApiController.privacypolicy);
router.get("/termscondition/list", auth, ApiController.termscondition);
router.get("/blog/list", auth, ApiController.blog);
router.get("/users/list", auth, ApiController.users);
router.get("/orders/list", auth, ApiController.orders);
router.get("/coupons/list", auth, ApiController.coupons);
router.get("/posts/list", auth, ApiController.get_all_posts);
router.post("/like/list", auth, ApiController.likes);
router.get("/packages/list", auth, ApiController.packages);
router.get("/classes/list", auth, ApiController.classes);
router.get("/documents/list", auth, ApiController.documents);
router.get("/shortvideos/list", auth, ApiController.get_all_shortvideos);
router.get("/blog_list", auth, ApiController.get_all_blogs)
router.post(
  "/shortvideo_likes/list",
  auth,
  ApiController.shortvideo_likes
);
router.post("/rateTrainer", auth, ApiController.rateTrainer);
router.get("/saved_videos/list", auth, ApiController.saved_videos);
router.post("/selectTrainer", auth, ApiController.selectTrainer);
router.post("/health_info", auth, ApiController.health_info);
router.post("/findTrainer", auth, ApiController.findTrainer);
router.post("/likeblog", auth, ApiController.likeblog);
router.get("/bloglikelist", auth, ApiController.bloglikelist);
router.post(
  "/calculate_basal_metabolic_rate",
  auth,
  ApiController.calculate_basal_metabolic_rate
);
router.post(
  "/calculate_total_daily_energy_expenditure",
  auth,
  ApiController.calculate_total_daily_energy_expenditure
);
router.post(
  "/calculate_total_daily_caloric_needs",
  auth,
  ApiController.calculate_total_daily_caloric_needs
);
router.post(
  "/calculate_ideal_weight",
  auth,
  ApiController.calculate_ideal_weight
);
router.get(
  "/get_activity_level_dropdown",
  auth,
  ApiController.get_activity_level_dropdown
);
router.get("/get_goal_dropdown", auth, ApiController.get_goal_dropdown);

router.get(
  "/get_approach_dropdown",
  auth,
  ApiController.get_approach_dropdown
);

router.post("/support", auth, ApiController.support_form);

module.exports = router;
