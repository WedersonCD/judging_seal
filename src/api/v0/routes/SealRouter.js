const Seal = require('../controllers/SealController');
const router = require('express').Router();

router.post('/',Seal.createSeal);
router.get('/',Seal.getAllSeals);
router.get('/:seal_name',Seal.getSealByName);


module.exports = router;