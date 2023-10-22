const router = require('express').Router();
const SettingController = require('../../controllers/admin/settingController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, SettingController.list);
router.post('/add', NotLoggedIn, SettingController.add);

module.exports = router;