const router = require('express').Router();
const Web_SliderController = require('../../controllers/admin/web_sliderController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_SliderController.list);
router.post('/add', NotLoggedIn, Web_SliderController.add);
router.post('/delete', NotLoggedIn, Web_SliderController.delete);

module.exports = router;