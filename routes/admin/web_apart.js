const router = require('express').Router();
const web_apartController = require('../../controllers/admin/web_apartController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');


router.get('/list', NotLoggedIn, web_apartController.list);
router.post('/add', NotLoggedIn, web_apartController.add);
router.post('/delete', NotLoggedIn, web_apartController.delete);


module.exports = router;