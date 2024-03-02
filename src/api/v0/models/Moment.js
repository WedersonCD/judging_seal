const mongoose = require('mongoose')

const momentSchema = new mongoose.Schema({
    moment_name: {type: String,required: true, unique: true},
    moment_rate: {type: Number, required: true, min: 1, max: 5},
    moment_createdAt:{type:Date,default:Date.now()},
    moment_updatedAt:{type:Date},
    moment_hashtags: [mongoose.Schema.Types.String]
})

momentSchema.pre('save', function(next) {
    this.moment_updatedAt = new Date();
    next();
});

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;