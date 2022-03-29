const express = require('express');
const router = express.Router();
const secondDetails = require('../../model/home/second');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/second/', verifyTokens, async (req,res) => {
    
    const second = new secondDetails({
        visible:req.body.visible,
        header: req.body.header,
        content: req.body.content        
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
router.patch('/second/:id',  verifyTokens, getSecond , async (req,res) => {

    if(req.body.visible != null){
        res.second.visible = req.body.visible;
    }
    if(req.body.header != null){
        res.second.header = req.body.header;
    }
    if(req.body.content != null){
        res.second.content = req.body.content;
    }   

    try {
       const updatedSecond = await res.second.save()
       res.json(updatedSecond) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/second/:id', verifyTokens, getSecond, async (req,res) => {
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