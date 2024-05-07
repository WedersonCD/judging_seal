import UserModel from '../models/User';
import UTILS from '../../../utils.js';
import jwt from 'jsonwebtoken';

const UserController = {}

UserController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

UserController.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if (!user)
            return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

UserController.createUser = async (req, res) => {

    console.log('creating new user...')
    try {

        const user_email = req.body.user_email;
        const user_name = req.body.user_name;
        const user_psw = req.body.user_psw;
        const user_nickName = req.body.user_nickName || req.body.user_name

        const newUser = new UserModel({
            user_email: user_email,
            user_name: user_name,
            user_nickName: user_nickName,
            user_psw: await UTILS.hashText(user_psw),
            user_hash: await UTILS.hashText([user_email, user_psw])
        });

        const savedUser = await newUser.save();
        const token = jwt.sign({ user_email: user_email, user_psw: user_psw }, process.env.JWT_SECRET);

        res.cookie('user_token', token);
        res.status(201).json({ user: savedUser, token: token });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

UserController.loginUser = async (req, res) => {
    console.log('Loggin user..');
    const user_email = req.body.user_email;
    const user_psw = req.body.user_psw;

    try {
        const logged_user = await UserModel.findOne({ user_email: user_email });

        if (!logged_user)
            return res.status(404).json({ message: 'login fail, user not found' });

        const user_psw_match = await UTILS.compareBcrypt(user_psw, logged_user.user_psw);

        if (!user_psw_match)
            return res.status(401).json({ message: 'Password not matched' });

        const token = jwt.sign({ user_email: user_email, user_psw: user_psw }, process.env.JWT_SECRET);

        res.cookie('user_token', token);
        res.status(201).json({ user: logged_user, token: token });

    } catch (err) {
        res.status(400).json({ message: err.message })
        console.error(err)
    }

}

export default  UserController;