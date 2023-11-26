const router = require('express').Router();
const { NotLoggedIn } = require('../../middlewares/Adminauth');
const setting_Footer = require('../../controllers/admin/settingFooterController');

router.get('/list', NotLoggedIn, setting_Footer.list);
router.get('/all', setting_Footer.get_Footer);
router.post('/add', NotLoggedIn, setting_Footer.add);
router.post('/delete', NotLoggedIn, setting_Footer.delete);

module.exports = router;