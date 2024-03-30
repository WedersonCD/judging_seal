const Seal = require('../controllers/SealController');
const router = require('express').Router();

router.post('/',Seal.createSeal);
router.get('/',Seal.getAllSeals);
router.get('/:seal-name',Seal.getSealByName);
router.delete('/',Seal.deleteSealById);
router.get('/opean-ocean',Seal.opeanOcean);


module.exports = router;