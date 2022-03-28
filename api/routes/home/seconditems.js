const express = require('express');
const router = express.Router();
const secondItemsDetails = require('../../model/home/seconditems');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/seconditems/', async (req,res) => {

    const secondtitems = new secondItemsDetails({
        items:req.body.items      
    });
   
    try {
        const newSecondItems = await secondtitems.save();
        res.status(201).json(newSecondItems);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/seconditems/', async (req,res) => {
    try {
        const seconditems = await secondItemsDetails.find();
        res.json(seconditems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/seconditems/:id',   getSecondItems, (req,res) => {
    try {
        res.json(res.seconditems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/seconditems/:id',  getSecondItems , async (req,res) => {
    
    if(req.body.items != null){
        res.seconditems.items = req.body.items;
    }    

    try {
       const updatedSecondItems = await res.seconditems.save()
       res.json(updatedSecondItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/seconditems/:id',  getSecondItems, async (req,res) => {
    try {
        await res.fseconditems.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getSecondItems(req, res, next){
    let fseconditems
    try {
        fseconditems = await secondItemsDetails.findById(req.params.id)
        if(fseconditems == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.fseconditems = fseconditems
    next();
}


module.exports = router;