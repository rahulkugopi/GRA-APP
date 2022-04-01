const express = require('express');
const router = express.Router();
const fewreasonsItemsDetails = require('../../model/home/fewreasonsitems');
const verifyTokens = require('../verifyTokens/verifyTokens');
const multer = require('multer');

const date = Date.now();

//define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination:function(reqest,file,callback){
        callback(null,'../uploads/fewreasons');
    },

    //add back the extension
    filename: function(reqest,file,callback){           
        const originalName = file.originalname.split(' ').join('');
        callback(null, date + '-' + originalName.toLowerCase());
    }   
});

//upload parameter for multer
const upload = multer({
    storage:storage,
    limits:{
       fileSize:1024*1024*3
    }
});
// Creating one
router.post('/fewreasonsitems/', upload.single('gridimage'), verifyTokens, async (req,res) => {
    
    //create new items
    const originalName = req.file.originalname.split(' ').join('');
    const fewreasonsitems = new fewreasonsItemsDetails({        
        gridheader: req.body.gridheader,
        gridcontent: req.body.gridcontent,        
        gridimage: {
            data:req.file.filename,
            contentType:'image',
            fileName: date + '-' + originalName.toLowerCase()
        }  
    });
   
    try {
        const newFewReasonsItems = await fewreasonsitems.save();
        res.status(201).json(newFewReasonsItems);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/fewreasonsitems/', async (req,res) => {
    try {
        const fewreasonsitems = await fewreasonsItemsDetails.find();
        res.json(fewreasonsitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/fewreasonsitems/:id',  getFewReasons , (req,res) => {
    try {
        res.json(res.fewreasonsitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/fewreasonsitems/:id',  upload.single('gridimage'), verifyTokens, getFewReasons , async (req,res) => {
    
    const originalName = req.file.originalname.split(' ').join('');

    if(req.body.gridheader != null){
        res.fewreasonsitems.gridheader = req.body.gridheader;
    }
    if(req.body.gridcontent != null){
        res.fewreasonsitems.gridcontent = req.body.gridcontent;
    }      

    res.fewreasonsitems.gridimage = {
        data:req.file.filename,
        contentType:'image',
        fileName: date + '-' + originalName.toLowerCase()
    }

    try {
       const updatedFewReasonsItems = await res.fewreasonsitems.save()
       res.json(updatedFewReasonsItems) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/fewreasonsitems/:id',  verifyTokens, getFewReasons, async (req,res) => {
    try {
        await res.fewreasonsitems.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFewReasons(req, res, next){
    let fewreasonsitems
    try {
        fewreasonsitems = await fewreasonsItemsDetails.findById(req.params.id)
        if(fewreasonsitems == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.fewreasonsitems = fewreasonsitems
    next();
}


module.exports = router;