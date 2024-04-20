const Seal = require('../controllers/SealController');
const router = require('express').Router();

router.get('/',Seal.getAllSeals);
router.get('/open-ocean',Seal.openOcean);
router.get('/:sealId',Seal.getSealById);

router.post('/',Seal.createSeal);
router.put('/',Seal.updateSeal);
router.delete('/',Seal.deleteSealById);

module.exports = router;