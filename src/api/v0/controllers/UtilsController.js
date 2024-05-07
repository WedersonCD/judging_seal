import jwt from 'jsonwebtoken';

const UtilsController ={}

UtilsController.getBaererToken = (req,res) =>{

    try {

        const userPayload = {user_email:req.body.user_email,user_psw:req.body.user_psw}
        const token = jwt.sign(userPayload, process.env.JWT_SECRET);

        res.status(200).json({token: token})

    }catch(err){
        res.status(500).json({message: err})
    }


}

export default  UtilsController;
