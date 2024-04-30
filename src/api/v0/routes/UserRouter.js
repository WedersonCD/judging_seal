const User = require('../controllers/UserController');
const router = require('express').Router();

router.post('/',User.createUser);
router.post('/login',User.loginUser);

router.get('/',User.getAllUsers);
router.get('/:userId',User.getUserById);

module.exports = router;