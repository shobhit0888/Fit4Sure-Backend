const router = require('express').Router();
const webCareersController = require('../../controllers/admin/web_careersController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, webCareersController.list);
router.get('/all', webCareersController.get_all_careers);
router.post('/add', NotLoggedIn, webCareersController.add);
router.post('/delete', NotLoggedIn, webCareersController.delete);


module.exports = router;