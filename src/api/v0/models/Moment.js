const mongoose = require('mongoose')

const momentSchema = new mongoose.Schema({
    moment_name: { type: String, required: true },
    moment_rate: { type: Number, required: true, min: 1, max: 5 },
    moment_createdAt: { type: Date, default: Date.now() },
    moment_updatedAt: { type: Date },
    moment_hashtags: [mongoose.Schema.Types.String],
    moment_isOnLastest: { type: Boolean, default: true },
    moment_description: {type: String, default:''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

momentSchema.methods.removeFromLastest = () => { this.moment_isOnLastest = false; };

momentSchema.pre('save', function (next) {
    this.moment_updatedAt = new Date();
    next();
});

momentSchema.pre('save', function (next) {
    this.user.updateLastestMoments(this)
    next();

    /*
    User.findOneAndUpdate(
        {_id: moment.user._id},
        { moment_lastest: moment._id },
        { new: true },
        (err, user) => {
            if (err) {
                next(err);
            } else {
                next();
            }
        }
    );
    //*/

});

/*
momentSchema.pre('deleteOne', function (next) {
    const moment = this;
    const User = mongoose.model('User');

    User.findById(moment.user._id, (err, user) => {

        const index = user.moment_latest.indexOf(moment._id);

        if (index > -1) {
            user.moment_latest.splice(index, 1);
            user.save();
        }
    });

    next();
});
//*/


const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;