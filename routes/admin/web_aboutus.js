const router = require('express').Router();
const Web_AboutusController = require('../../controllers/admin/web_aboutusController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_AboutusController.list);
router.get('/all', Web_AboutusController.get_aboutus);
router.post('/add', NotLoggedIn, Web_AboutusController.add);
router.post('/delete', NotLoggedIn, Web_AboutusController.delete);

module.exports = router;