import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_psw: { type: String, required: true },
    user_hash: { type: String, required: true },
    user_createdAt: { type: Date, default: Date.now() },
    user_updatedAt: { type: Date },
    seal_lastest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seal" }],
    user_loginAt: { type: Date }
})

userSchema.pre('save', function (next) {
    this.user_updatedAt = new Date();
    next();
});

userSchema.methods.updateLastestSeals = (seal)=>{

    try{
        const user = seal.user;

        if(user.seal_lastest.length >= 5)
            user.seal_lastest.shift();
        
        user.seal_lastest.push(seal)

        user.save()
    }catch(err){
        console.log('err: ',err)
    }

};

const User = mongoose.model('User', userSchema);

export default  User;