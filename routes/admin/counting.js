const router = require('express').Router();
const CountingController = require('../../controllers/admin/countingController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');


router.get('/list', NotLoggedIn, CountingController.list);
router.post('/add', NotLoggedIn, CountingController.add);
router.post('/delete', NotLoggedIn, CountingController.delete);

module.exports = router;