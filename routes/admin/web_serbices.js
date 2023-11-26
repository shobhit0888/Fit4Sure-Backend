const router = require('express').Router();
const Web_ServicesController = require('../../controllers/admin/web_servicesController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_ServicesController.list);
router.post('/add', NotLoggedIn, Web_ServicesController.add);
router.post('/delete', NotLoggedIn, Web_ServicesController.delete);

module.exports = router;