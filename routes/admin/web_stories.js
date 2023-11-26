const router = require('express').Router();
const webStoriesController = require('../../controllers/admin/web_storiesController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, webStoriesController.list);
router.get('/all', webStoriesController.get_all_stories);
router.post('/add', NotLoggedIn, webStoriesController.add);
router.post('/delete', NotLoggedIn, webStoriesController.delete);


module.exports = router;