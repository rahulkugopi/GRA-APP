const express = require('express');
const router = express.Router();
const { loginValidation } = require('../../validation/login/login');
const userDetails = require('../../model/users/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let refreshTokens = [];

router.post('/login', async (req,res) => { 
    const { error } = loginValidation(req.body)
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    } 

     //Checking if the email exits.
     const user = await userDetails.findOne({ email: req.body.email })

     if(!user){
          return res.status(400).json({ message: 'Email is not found'})
     } 
 
     //password is correct
     const validPass = await bcrypt.compare(req.body.password, user.password)
     if(!validPass){
         return res.status(400).json({ message : "Invalid password" })
     }
 
     const loginDetails = {
         email:req.body.email,
         userid:user._id,
         name:user.name
     }

    let accessToken = jwt.sign({loginDetails,expiresIn : '1m'},process.env.TOKEN);
    let refreshToken = jwt.sign({loginDetails,expiresIn: '7d'},process.env.TOKEN);
    refreshTokens.push(refreshToken);
    
    res.status(201).header('Authorization', accessToken);

    return res.status(201).json({
        accessToken,
        refreshToken
    });
}); 

router.post('/refreshToken', async (req,res) => { 
    const refreshToken = req.body.refreshToken
    if(refreshToken == null){
        return res.status(401).json({message:res.status(401)})
    }

    if(!refreshToken.includes(refreshToken)){
        return res.status(403).json({message:res.status(403)})
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
        if(err){
            return res.status(403).json({ message : err.message })
        }

        const loginDeatils = {
            email:payload.loginDeatils.email,
            userid:payload.loginDeatils.userid,
            name:payload.loginDeatils.name
        }
       
        const accessToken = jwt.sign({loginDeatils,expiresIn : '5m'},process.env.TOKEN)
        res.json({accessToken: accessToken});
    });
});

module.exports = router;   