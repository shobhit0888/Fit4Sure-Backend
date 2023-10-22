const router = require("express").Router();
const { auth } = require("../../middlewares/Appauth");
const AuthController = require("../../controllers/app/authController");

router.post("/login", AuthController.login);
router.post("/otp-verify", AuthController.otp_verify);
router.post("/register", AuthController.register);
router.post("/profile-update", AuthController.editProfile);
router.post("/get_user_profile", AuthController.get_user_profile);
router.post("/coupon-verify", auth, AuthController.coupon_verify);

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.post("/google_auth", AuthController.googleAuthCallback);
router.get("/user-profile", auth, AuthController.userProfile);
router.post("/forgot-password", AuthController.forgotPassword);
router.put("/edit-profile/:userId", auth, AuthController.editUserProfile);
router.put("/change-password", auth, AuthController.changePassword);

module.exports = router;
