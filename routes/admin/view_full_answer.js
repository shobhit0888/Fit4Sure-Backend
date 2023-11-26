const router = require('express').Router();
const ViewFullAnswerController = require('../../controllers/admin/view_full_answerController');
const Adminauth = require('../../models/Adminauth');

router.get('/list', ViewFullAnswerController.index);
router.post('/add', ViewFullAnswerController.add);
router.post('/edit', ViewFullAnswerController.edit);
router.post('/delete', ViewFullAnswerController.delete);

module.exports = router;