const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_psw: { type: String, required: true },
    user_hash: { type: String, required: true },
    user_createdAt: { type: Date, default: Date.now() },
    user_updatedAt: { type: Date },
    moment_lastest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moment" }],
    user_loginAt: { type: Date }
})

userSchema.methods.login = () => {
    this.user_loginAt = new Date();
};


userSchema.pre('save', function (next) {
    this.user_updatedAt = new Date();
    next();
});



userSchema.methods.updateLastestMoments = (moment)=>{

    try{
        const user = moment.user;

        if(user.moment_lastest.length >= 5)
            user.moment_lastest.shift();
        
        user.moment_lastest.push(moment)

        user.save()
    }catch(err){
        console.log('err: ',err)
    }


};

const User = mongoose.model('User', userSchema);

module.exports = User;