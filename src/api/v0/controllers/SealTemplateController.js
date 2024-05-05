import SealTemplateModel from '../models/SealTemplate';

const SealTemplateController = {}

SealTemplateController.getAllSealTemplates = async (req, res) => {
    try {
        const sealTemplates = await SealTemplateModel.find();
        res.status(200).json(sealTemplates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

SealTemplateController.createSealTemplate = async (req, res) => {

    console.log('creating new sealTemplate...')
    try {

        const newSealTemplate = new SealTemplateModel({
            sealTemplate_question: req.body.sealTemplate_question,
            seal_name: req.body.seal_name,
            seal_hashtags: req.body.seal_hashtags,
            seal_description: req.body.seal_description

        });

        const savedSealTemplate = await newSealTemplate.save();

        if(!savedSealTemplate || savedSealTemplate.length==0){
            console.error('Error in creat seal template:',savedSealTemplate)
            res.status(500).json({ message:savedSealTemplate })
        }

        res.status(201).json({ sealTemplate: savedSealTemplate});

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

export default  SealTemplateController;