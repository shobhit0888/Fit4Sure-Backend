const router = require('express').Router();
const Web_UserContactInfoController = require('../../controllers/admin/web_userContactInfoController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_UserContactInfoController.list);
router.post('/delete', NotLoggedIn, Web_UserContactInfoController.delete);

module.exports = router;