const express = require('express');
const router = express.Router();
const userDetails = require('../../model/users/users');
const bcrypt = require('bcryptjs');
const { userRegisterValidation } = require('../../validation/users/users');
const verifyTokens = require('../verifyTokens/verifyTokens');


// Creating one
router.post('/register/', verifyTokens, async (req,res) => {
    
    // validate the data
    const { error } = userRegisterValidation(req.body)
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }  

    //duplication checking
    const emailExist = await userDetails.findOne({ email: req.body.email })
    if(emailExist){
        return res.status(400).json({ message: 'Email already exists'})
    } 

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new userDetails({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    });
   
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/register/', verifyTokens, async (req,res) => {
    try {
        const users = await userDetails.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/register/:id',  verifyTokens, getUsers, (req,res) => {
    try {
        res.json(res.users);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/register/:id', verifyTokens,  getUsers , async (req,res) => {
    if(req.body.name != null){
        res.users.name = req.body.name;
    }
    if(req.body.password != null){
        res.users.password = req.body.password;
    }
    if(req.body.email != null){
        res.users.email = req.body.email;
    }

    try {
       const updatedUser = await res.users.save()
       res.json(updatedUser) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/register/:id', verifyTokens ,  getUsers, async (req,res) => {
    try {
        await res.users.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


async function getUsers(req, res, next){
    let users
    try {
        users = await userDetails.findById(req.params.id)
        if(users == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.users = users
    next()
}

module.exports = router;