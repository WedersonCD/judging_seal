const Moment = require('../controllers/MomentController');
const router = require('express').Router();

router.post('/',Moment.createMoment);
router.get('/',Moment.getAllMoments);
router.get('/:moment_name',Moment.getMomentByName);


module.exports = router;