const jwt = require('jsonwebtoken');

function authJWMiddleware (req,res,next){
        // Retrieve token from the 'Authorization' header
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]; // Bearer <token>
    
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

                if (err)
                    return res.sendStatus(403); // Forbidden if error occurs
    
                req.user = user;
                next();
            });
        } else {
            res.status(401); // Unauthorized if no token is provided
        }
    
}

module.exports = authJWMiddleware;
