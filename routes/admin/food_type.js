const router = require('express').Router();
const Food_TypeController = require('../../controllers/admin/food_typeController');
const { NotLoggedIn } = require('../../middlewares/Adminauth')

router.get('/list', NotLoggedIn, Food_TypeController.list);
router.post('/add', NotLoggedIn, Food_TypeController.add);
router.post('/delete', NotLoggedIn, Food_TypeController.delete); 

module.exports = router;