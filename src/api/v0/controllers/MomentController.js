const MomentModel = require('../models/Moment');

const MomentController = {}

MomentController.getAllMoments = async (req, res) => {
    try {
        const moments = await MomentModel.find({user: req.user});
        res.status(200).json(moments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



MomentController.getMomentByName = async (req, res) => {
    try {
        const momentName = req.params.moment_name;
        const moment = await MomentModel.findById(momentName);

        if (!moment) {
            return res.status(404).json({ message: 'Moment not found' });
        }

        res.status(200).json(moment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

MomentController.createMoment = async (req, res) => {
    
    const newMoment = new MomentModel({
        user: req.user,
        moment_name: req.body.moment_name,
        moment_rate: req.body.moment_rate,
        moment_hashtags: req.body.moment_hashtags
    });

    try {
        const savedMoment = await newMoment.save();
        res.status(201).json(savedMoment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = MomentController;