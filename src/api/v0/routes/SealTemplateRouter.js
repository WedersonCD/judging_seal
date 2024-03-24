const SealTemplate = require('../controllers/SealTemplateController');
const router = require('express').Router();

router.post('/',SealTemplate.createSealTemplate);
router.get('/',SealTemplate.getAllSealTemplates);


module.exports = router;