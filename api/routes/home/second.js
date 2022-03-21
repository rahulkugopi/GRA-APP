const express = require('express');
const router = express.Router();
const secondDetails = require('../../model/home/second');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/second/', async (req,res) => {
    
    //create new banner
    const second = new secondDetails({
        header: req.body.header,
        content: req.body.content,
        image: req.body.image,
        subItem: req.body.subItem
    });
   
    try {
        const newSecond = await second.save();
        res.status(201).json(newSecond);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/second/', async (req,res) => {
    try {
        const second = await secondDetails.find();
        res.json(second);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/second/:id',  getSecond , (req,res) => {
    try {
        res.json(res.second);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/second/:id',  getSecond , async (req,res) => {

    if(req.body.header != null){
        res.second.header = req.body.header;
    }
    if(req.body.content != null){
        res.second.content = req.body.content;
    }
    if(req.body.email != null){
        res.second.email = req.body.email;
    }
    if(req.body.image != null){
        res.second.image = req.body.image;
    }
    if(req.body.subItem != null){
        res.second.subItem = req.body.subItem;
    }

    try {
       const updatedSecond = await res.second.save()
       res.json(updatedSecond) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/second/:id',  getSecond, async (req,res) => {
    try {
        await res.second.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getSecond(req, res, next){
    let second
    try {
        second = await secondDetails.findById(req.params.id)
        if(second == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.second = second
    next();
}


module.exports = router;