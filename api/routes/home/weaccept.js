const express = require('express');
const router = express.Router();
const weacceptDetails = require('../../model/home/weaccept');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/weaccept/', async (req,res) => {
    
    //create new banner
    const weaccept = new weacceptDetails({
        header: req.body.header,
        content: req.body.content,
        images:req.body.images
    });
   
    try {
        const newWeAccept = await weaccept.save();
        res.status(201).json(newWeAccept);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/weaccept/', async (req,res) => {
    try {
        const weaccept = await weacceptDetails.find();
        res.json(weaccept);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/weaccept/:id',  getWeAccept , (req,res) => {
    try {
        res.json(res.weaccept);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/weaccept/:id',  getWeAccept , async (req,res) => {

    if(req.body.header != null){
        res.weaccept.header = req.body.header;
    }
    if(req.body.content != null){
        res.weaccept.content = req.body.content;
    }
    if(req.body.images != null){
        res.weaccept.images = req.body.images;
    }

    try {
       const updatedWeAccept = await res.weaccept.save()
       res.json(updatedWeAccept) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/weaccept/:id',  getWeAccept, async (req,res) => {
    try {
        await res.weaccept.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getWeAccept(req, res, next){
    let weaccept
    try {
        weaccept = await weacceptDetails.findById(req.params.id)
        if(weaccept == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.weaccept = weaccept
    next();
}


module.exports = router;