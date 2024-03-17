const Utils = require('../controllers/UtilsController');
const router = require('express').Router();

router.post('/baerer_token',Utils.getBaererToken);


module.exports = router;