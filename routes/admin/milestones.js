const router = require('express').Router();
const MilestonesController = require('../../controllers/admin/milestonesController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, MilestonesController.list);
router.get('/all', MilestonesController.get_all_milestones);
router.post('/add', NotLoggedIn, MilestonesController.add);
router.post('/delete', NotLoggedIn, MilestonesController.delete);

module.exports = router;