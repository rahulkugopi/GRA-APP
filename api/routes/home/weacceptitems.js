const express = require('express');
const router = express.Router();
const weAcceptItemsDetails = require('../../model/home/weacceptitems');
const verifyTokens = require('../verifyTokens/verifyTokens');
const multer = require('multer');

const date = Date.now();

//define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination:function(reqest,file,callback){
        callback(null,'../uploads/weaccept');
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
router.post('/weacceptitems/', upload.single('images'), verifyTokens, async (req,res) => {
    
    const originalName = req.file.originalname.split(' ').join('');
    const weaccept = new weAcceptItemsDetails({
        images: {
            data:req.file.filename,
            contentType:'image/png',
            fileName: date + '-' + originalName.toLowerCase()
        } 
    });
   
    try {
        const newWeAcceptItems = await weaccept.save();
        res.status(201).json(newWeAcceptItems);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/weacceptitems/', async (req,res) => {
    try {
        const weacceptitems = await weAcceptItemsDetails.find();
        res.json(weacceptitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/weacceptitems/:id',   getWeAcceptitemstems, (req,res) => {
    try {
        res.json(res.weacceptitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/weacceptitems/:id', verifyTokens, getWeAcceptitemstems , async (req,res) => {
    
    const originalName = req.file.originalname.split(' ').join('');
      
    res.weacceptitems.image = {
        data:req.file.filename,
        contentType:'image/png',
        fileName: date + '-' + originalName.toLowerCase()
    }

    try {
       const updatedWeAcceptItems = await res.weacceptitems.save()
       res.json(updatedWeAcceptItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/weacceptitems/:id',  getWeAcceptitemstems, async (req,res) => {
    try {
        await res.weacceptitems.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getWeAcceptitemstems(req, res, next){
    let weacceptitems
    try {
        weacceptitems = await weAcceptItemsDetails.findById(req.params.id)
        if(weacceptitems == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.weacceptitems = weacceptitems
    next();
}


module.exports = router;