const express = require('express');
const router = express.Router();
const fewreasonsDetails = require('../../model/home/fewreasons');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/fewreasons/', async (req,res) => {
    
    //create new banner
    const fewreasons = new fewreasonsDetails({
        visible: req.body.visible,
        mainheader: req.body.mainheader,
        maincontent: req.body.maincontent,
        grid:req.body.grid
    });
   
    try {
        const newFewReasons = await fewreasons.save();
        res.status(201).json(newFewReasons);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/fewreasons/', async (req,res) => {
    try {
        const fewreasons = await fewreasonsDetails.find();
        res.json(fewreasons);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/fewreasons/:id',  getFewReasons , (req,res) => {
    try {
        res.json(res.fewreasons);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/fewreasons/:id',  getFewReasons , async (req,res) => {
    
    if(req.body.visible != null){
        res.fewreasons.visible = req.body.visible;
    }
    if(req.body.mainheader != null){
        res.fewreasons.mainheader = req.body.mainheader;
    }
    if(req.body.maincontent != null){
        res.fewreasons.maincontent = req.body.maincontent;
    }
    if(req.body.grid != null){
        res.fewreasons.grid = req.body.grid;
    }

    try {
       const updatedFewReasons = await res.fewreasons.save()
       res.json(updatedFewReasons) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/fewreasons/:id',  getFewReasons, async (req,res) => {
    try {
        await res.fewreasons.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFewReasons(req, res, next){
    let fewreasons
    try {
        fewreasons = await fewreasonsDetails.findById(req.params.id)
        if(fewreasons == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.fewreasons = fewreasons
    next();
}


module.exports = router;