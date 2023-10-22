const router = require('express').Router();
const Web_contactController = require('../../controllers/admin/Web_contactController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_contactController.list);
router.post('/add', NotLoggedIn, Web_contactController.add);
router.post('/edit', NotLoggedIn, Web_contactController.edit);
router.post('/delete', NotLoggedIn, Web_contactController.delete);

module.exports = router;