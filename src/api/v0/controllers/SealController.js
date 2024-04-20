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

SealController.getSealById = async (req, res) => {

    try {
        const sealId = req.params.sealId;
        const seal = await SealModel.findById(sealId);

        if (!seal) {
            return res.status(404).json({ message: 'Seal not found' });
        }

        return res.status(200).json(seal);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

SealController.openOcean = async(req,res)=>{

    try {
        const seals = await SealModel.find();

        if(!seals)
            res.status(400).send();
        
        res.status(200).json(seals);

    }catch{
        res.status(500).json({ message: err.message });
    }
}

SealController.updateSeal = async (req, res) => {
    
    try {

        const seal_id = req.body?._id;
        const user_id = req.user?._id;

        if(!seal_id)
            return res.status(400).json({message: 'request body property _id not found'});
        
        if(!user_id)
            return res.status(400).json({message: 'request head auth user not found'});

        const seal = await SealModel.findOne({_id:seal_id, user:user_id});

        if(!seal)
            return res.status(404).json({message: 'seal not found'});

        //update the propertys.
        seal.seal_name          = req.body.seal_name        || seal.seal_name       
        seal.seal_rate          = req.body.seal_rate        || seal.seal_rate       
        seal.seal_hashtags      = req.body.seal_hashtags    || seal.seal_hashtags   
        seal.seal_description   = req.body.seal_description || seal.seal_description
        
        await seal.save()

        return res.status(201).json(seal);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

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