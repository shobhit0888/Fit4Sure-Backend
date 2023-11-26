const router = require('express').Router();
const webQnaController = require('../../controllers/admin/web_qnaController');
const { NotLoggedIn } = require('../../middlewares/Adminauth');

router.get('/list', NotLoggedIn, webQnaController.list);
router.get('/all', webQnaController.get_all_qna);
router.post('/add', NotLoggedIn, webQnaController.add);
router.post('/delete', NotLoggedIn, webQnaController.delete);


module.exports = router;