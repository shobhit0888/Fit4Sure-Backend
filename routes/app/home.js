const router = require('express').Router();
const { auth } = require('../../middlewares/Appauth');

router.get('/home', auth, async (req, res) => {
    return res.send('Home routes working');
});


module.exports = router;