const router = require('express').Router();
const {NotLoggedIn} = require('../../middlewares/Adminauth');
const TrainerController = require('../../controllers/admin/trainerController');

router.get('/add', NotLoggedIn, TrainerController.addGet);
router.post('/add', NotLoggedIn, TrainerController.add);
router.get('/list', NotLoggedIn, TrainerController.trainerList);
router.post("/approved", NotLoggedIn, TrainerController.Approved);
router.post("/edit", NotLoggedIn, TrainerController.edit);
router.post("/delete", NotLoggedIn, TrainerController.delete);
router.get("/details/:trainerId", NotLoggedIn, TrainerController.trainerDetails);
router.get("/category/:categoryId", TrainerController.trainerByCategory);

module.exports = router;