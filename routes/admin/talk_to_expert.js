const router = require('express').Router();
const Talk_To_ExpertController = require('../../controllers/admin/Talk_to_expertController');
const { NotLoggedIn } = require('../../middlewares/Adminauth')

router.get('/list', NotLoggedIn, Talk_To_ExpertController.list);
router.post('/add', NotLoggedIn, Talk_To_ExpertController.add);
router.post('/delete', NotLoggedIn, Talk_To_ExpertController.delete);

module.exports = router;