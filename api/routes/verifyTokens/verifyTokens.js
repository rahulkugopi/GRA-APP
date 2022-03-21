const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){   
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({ message: "User not authenticated" });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ message : "Invalid Token"});
    }
}
