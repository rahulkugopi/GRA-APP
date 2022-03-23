const express = require('express');
const router = express.Router();
const firstDetails = require('../../model/home/first');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/first/', async (req,res) => {
    
    //create new banner
    const first = new firstDetails({
        header: req.body.header,
        content: req.body.content,
        image: req.body.image,
        subitem: req.body.subitem
    });
   
    try {
        const newFirst = await first.save();
        res.status(201).json(newFirst);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/first/', async (req,res) => {
    try {
        const first = await firstDetails.find();
        res.json(first);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/first/:id',   getFirst, (req,res) => {
    try {
        res.json(res.first);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/first/:id',  getFirst , async (req,res) => {

    if(req.body.header != null){
        res.first.header = req.body.header;
    }
    if(req.body.content != null){
        res.first.content = req.body.content;
    }
    if(req.body.email != null){
        res.first.email = req.body.email;
    }
    if(req.body.image != null){
        res.first.image = req.body.image;
    }
    if(req.body.subItem != null){
        res.first.subItem = req.body.subItem;
    }

    try {
       const updatedFirst = await res.first.save()
       res.json(updatedFirst) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/first/:id',  getFirst, async (req,res) => {
    try {
        await res.first.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFirst(req, res, next){
    let first
    try {
        first = await firstDetails.findById(req.params.id)
        if(first == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.first = first
    next();
}


module.exports = router;