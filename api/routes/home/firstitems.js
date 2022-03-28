const express = require('express');
const router = express.Router();
const firstItemsDetails = require('../../model/home/firstitems');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/firstitems/', verifyTokens, async (req,res) => {

    const firsttitems = new firstItemsDetails({
        items:req.body.items      
    });
   
    try {
        const newFirstItems = await firsttitems.save();
        res.status(201).json(newFirstItems);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/firstitems/',  async (req,res) => {
    try {
        const firstitems = await firstItemsDetails.find();
        res.json(firstitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/firstitems/:id', verifyTokens,  getFirstItems, (req,res) => {
    try {
        res.json(res.firstitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/firstitems/:id', verifyTokens, getFirstItems , async (req,res) => {
    
    if(req.body.items != null){
        res.firstitems.items = req.body.items;
    }    

    try {
       const updatedFirstItems = await res.firstitems.save()
       res.json(updatedFirstItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/firstitems/:id', verifyTokens, getFirstItems, async (req,res) => {
    try {
        await res.firstitems.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFirstItems(req, res, next){
    let firstitems
    try {
        firstitems = await firstItemsDetails.findById(req.params.id)
        if(firstitems == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.firstitems = firstitems
    next();
}


module.exports = router;