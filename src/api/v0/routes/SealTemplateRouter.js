import SealTemplate from '../controllers/SealTemplateController';
import express from 'express';
const router = express.Router();

router.post('/',SealTemplate.createSealTemplate);
router.get('/',SealTemplate.getAllSealTemplates);


export default  router;