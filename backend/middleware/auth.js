const jwt = require('jsonwebtoken');

const authMiddleWre = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(!token) {
            return res.status(401).json({message : "No token, access denied!"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error) {
        return res.status(401).json({message : "Token is not valid"});
    }
};

module.exports = authMiddleWre;