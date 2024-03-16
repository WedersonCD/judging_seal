const UserModel = require('../models/User');
const UTILS = require('../../../utils.js');
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

module.exports = UserController;