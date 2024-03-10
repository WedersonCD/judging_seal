const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_psw: { type: String, required: true },
    user_createdAt: { type: Date, default: Date.now() },
    user_updatedAt: { type: Date },
    moment_lastest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moment" }]
})

userSchema.pre('save', function (next) {
    this.user_updatedAt = new Date();
    next();
});


/*

//makes sure that wouldn't be more then 5 moments on the moment_lastest property
userSchema.pre('updateOne', function (next) {
    const update = this.getUpdate();

    if (update && update.$push && update.$push.moment_lastest && this.moment_lastest.length >= 5) {
        const removeMoment = this.moment_lastest.shift();
    }

    next();
});
/*/

const User = mongoose.model('User', userSchema);

module.exports = User;