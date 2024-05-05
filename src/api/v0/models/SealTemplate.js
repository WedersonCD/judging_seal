import mongoose from 'mongoose';

const sealTemplateSchema = new mongoose.Schema({
    sealTemplate_question: { type: String, required: true },
    seal_name: { type: String },
    seal_hashtags: [mongoose.Schema.Types.String],
    seal_description: { type: String }
})

const SealTemplate = mongoose.model('SealTemplate', sealTemplateSchema);

export default  SealTemplate;