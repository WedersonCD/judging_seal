import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import UTILS from '../../../utils.js';



function getTokenFromReq(req) {

    let tokenFromCookie = null;
    let tokenFromAuthorization = null;

    if(req.parsedCookies)
        tokenFromCookie =  req.parsedCookies.user_token;

    if(req.headers.authorization)
        tokenFromAuthorization = req.headers.authorization.split(' ')[1];

    return tokenFromCookie || tokenFromAuthorization
}


export default async function authJWMiddleware(req, res, next) {
    
    const token = getTokenFromReq(req);

    if(!token)
        return res.status(401).json({ message: "token did not found" }); // Unauthorized if no token is provided

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (!user)
            return res.sendStatus(403); // Forbidden if error occurs

        const user_name = user.user_name;
        const user_psw = user.user_psw;

        const logged_user = await UserModel.findOne({ user_name: user_name });

        if (!logged_user)
            return res.status(404).json({ message: 'login fail, user not found' });

        const user_psw_match = await UTILS.compareBcrypt(user_psw, logged_user.user_psw);

        if (!user_psw_match)
            return res.status(401).json({ message: 'Password not matched' });

        req.user = logged_user
        
        next();

    } catch (err) {
        return res.status(400).json({ message: err });
    }

}