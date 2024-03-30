const SealModel = require('../models/Seal');

const SealController = {}

SealController.getAllSeals = async (req, res) => {
    try {
        const seals = await SealModel.find({user: req.user});
        res.status(200).json(seals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

SealController.deleteSealById = async(req, res)=>{
    
    try {
        const sealId =req.query.sealId;
        
        if(!sealId)
            return res.status(400).json({message: 'property _id is missing'});
        
        const deletedSeal = await SealModel.findByIdAndDelete(sealId);

        if(!deletedSeal)
            return res.status(404).json({message: 'Seal not found with id:'+sealId})

        res.status(200).json({message: 'deleted with sucess'})

    }catch(err){

        res.status(500).json({ where:'deleteSealById',message: err.message });

    }
}

SealController.getSealByName = async (req, res) => {
    try {
        const sealName = req.params.seal_name;
        const seal = await SealModel.findById(sealName);

        if (!seal) {
            return res.status(404).json({ message: 'Seal not found' });
        }

        res.status(200).json(seal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

SealController.opeanOcean = async(req,res)=>{
    try {

        const seals = await SealModel.find();
        if(!seals)
            res.status(400).send();
        
        res.status(200).json(seals);

    }catch{
        res.status(500).json({ message: err.message });
    }
}

SealController.createSeal = async (req, res) => {
    
    const newSeal = new SealModel({
        user: req.user,
        seal_name: req.body.seal_name,
        seal_rate: req.body.seal_rate,
        seal_hashtags: req.body.seal_hashtags,
        seal_description: req.body.seal_description || ''
    });

    try {
        const savedSeal = await newSeal.save();
        res.status(201).json(savedSeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = SealController;