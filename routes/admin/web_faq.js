const router = require('express').Router();
const Web_FaqController = require('../../controllers/admin/web_faqController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_FaqController.list);
router.get('/all', Web_FaqController.get_all_faq);
router.post('/add', NotLoggedIn, Web_FaqController.add);
router.post('/delete', NotLoggedIn, Web_FaqController.delete);

module.exports = router;