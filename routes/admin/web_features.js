const router = require('express').Router();
const webFeaturesController = require('../../controllers/admin/web_featuresController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, webFeaturesController.list);
router.get('/all', webFeaturesController.get_all_features);
router.post('/add', NotLoggedIn, webFeaturesController.add);
router.post('/delete', NotLoggedIn, webFeaturesController.delete);


module.exports = router;