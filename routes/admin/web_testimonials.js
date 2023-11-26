const router = require('express').Router();
const Web_TestimonialsController = require('../../controllers/admin/web_testimonialsController');
const { NotLoggedIn } = require('../../middlewares/Adminauth')

router.get('/list', NotLoggedIn, Web_TestimonialsController.list);
router.post('/add', NotLoggedIn, Web_TestimonialsController.add);
router.post('/delete', NotLoggedIn, Web_TestimonialsController.delete);

module.exports = router;