const router = require('express').Router();
const Web_HeroController = require('../../controllers/admin/web_heroController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, Web_HeroController.list);
router.get('/all', Web_HeroController.get_all_hero);
router.post('/add', NotLoggedIn, Web_HeroController.add);
router.post('/delete', NotLoggedIn, Web_HeroController.delete);

module.exports = router;