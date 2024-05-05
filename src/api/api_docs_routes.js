import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';

import YAML from 'yamljs';

const API_VERSION_LTS = process.env.API_VERSION_LTS || '0'

const swaggerDocumentLTS = YAML.load('./docs/openapi_v'+API_VERSION_LTS+'.yml');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocumentLTS));

const swaggerDocumentV0 = YAML.load('./docs/openapi_v0.yml');

router.use('/v0', swaggerUi.serve);
router.get('/v0', swaggerUi.setup(swaggerDocumentV0));


export default router;