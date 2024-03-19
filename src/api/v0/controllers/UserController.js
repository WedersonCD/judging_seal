const UserModel = require('../models/User');
const UTILS = require('../../../utils.js');
const jwt = require('jsonwebtoken');

const UserController = {}

UserController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

UserController.getUserByName = async (req, res) => {
    try {
        const userName = req.params.user_name;
        const user = await UserModel.findById(userName);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

UserController.createUser = async (req, res) => {

    console.log('creating new user...')
    const user_name = req.body.user_name;
    const user_psw  = req.body.user_psw;

    const newUser = new UserModel({
        user_name: user_name,
        user_psw: await UTILS.hashText(user_psw),
        user_hash: await UTILS.hashText([user_name,user_psw])
    });
    
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


UserController.loginUser = async(req, res) =>{
    console.log('Loggin user..');
    const user_name = req.body.user_name;
    const user_psw  = req.body.user_psw;

    try{
        const logged_user = await UserModel.findOne({user_name: user_name});

        if (!logged_user)
            return res.status(404).json({ message: 'login fail, user not found' });

        const user_psw_match = await UTILS.compareBcrypt(user_psw,logged_user.user_psw);

        if (!user_psw_match)
            return res.status(401).json({ message: 'Password not matched' });
        
        const token = jwt.sign({user_name:user_name,user_psw:user_psw}, process.env.JWT_SECRET);

        logged_user.login()
        res.cookie('user_token',token);
        res.status(201).json({user:logged_user,token:token});
    
    }catch(err){
        res.status(400).json({message: err.message})
    }

}


module.exports = UserController;