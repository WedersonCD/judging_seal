import User from '../controllers/UserController';
import express from 'express';
const router = express.Router();

router.post('/',User.createUser);
router.post('/login',User.loginUser);

router.get('/',User.getAllUsers);
router.get('/:userId',User.getUserById);

export default  router;