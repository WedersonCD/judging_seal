import mongoose from 'mongoose';

const sealSchema = new mongoose.Schema({
    seal_name: { type: String, required: true },
    seal_rate: { type: Number, required: true, min: 1, max: 5 },
    seal_createdAt: { type: Date, default: Date.now() },
    seal_updatedAt: { type: Date },
    seal_hashtags: [mongoose.Schema.Types.String],
    seal_isOnLastest: { type: Boolean, default: true },
    seal_description: {type: String, default:''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

sealSchema.methods.removeFromLastest = () => { this.seal_isOnLastest = false; };

sealSchema.pre('save', function (next) {
    this.seal_updatedAt = new Date();
    next();
});


/*
sealSchema.pre('deleteOne', function (next) {
    const seal = this;
    const User = mongoose.model('User');

    User.findById(seal.user._id, (err, user) => {

        const index = user.seal_latest.indexOf(seal._id);

        if (index > -1) {
            user.seal_latest.splice(index, 1);
            user.save();
        }
    });

    next();
});
//*/


const Seal = mongoose.model('Seal', sealSchema);

export default  Seal;