const express = require('express');
const router = express.Router();
const fewstepDetails = require('../../model/home/fewstep');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/fewstep/', async (req,res) => {
    
    //create new banner
    const fewstep = new fewstepDetails({
        mainheader: req.body.mainheader,
        maincontent: req.body.maincontent,
        grid:req.body.grid
    });
   
    try {
        const newFewStep = await fewstep.save();
        res.status(201).json(newFewStep);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/fewstep/', async (req,res) => {
    try {
        const fewstep = await fewstepDetails.find();
        res.json(fewstep);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/fewstep/:id',  getFewStep , (req,res) => {
    try {
        res.json(res.fewstep);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/fewstep/:id',  getFewStep , async (req,res) => {

    if(req.body.mainheader != null){
        res.fewstep.mainheader = req.body.mainheader;
    }
    if(req.body.maincontent != null){
        res.fewstep.maincontent = req.body.maincontent;
    }
    if(req.body.grid != null){
        res.fewstep.grid = req.body.grid;
    }

    try {
       const updatedFewStep = await res.fewstep.save()
       res.json(updatedFewStep) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/fewstep/:id',  getFewStep, async (req,res) => {
    try {
        await res.fewstep.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFewStep(req, res, next){
    let fewstep
    try {
        fewstep = await fewstepDetails.findById(req.params.id)
        if(fewstep == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.fewstep = fewstep
    next();
}


module.exports = router;