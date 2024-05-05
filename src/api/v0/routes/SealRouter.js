import Seal from '../controllers/SealController';
import express from 'express';

const router = express.Router();

router.get('/',Seal.getAllSeals);
router.get('/open-ocean',Seal.openOcean);
router.get('/:sealId',Seal.getSealById);

router.post('/',Seal.createSeal);
router.put('/:sealId',Seal.updateSeal);
router.delete('/',Seal.deleteSealById);

export default  router;