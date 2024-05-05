import Utils from '../controllers/UtilsController';
import express from 'express';

const router = express.Router();

router.post('/baerer_token',Utils.getBaererToken);


export default  router;