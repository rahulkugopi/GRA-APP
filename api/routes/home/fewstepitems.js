const express = require('express');
const router = express.Router();
const fewstepItemsDetails = require('../../model/home/fewstepitems');
const verifyTokens = require('../verifyTokens/verifyTokens');
const multer = require('multer');

const date = Date.now();

//define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination:function(reqest,file,callback){
        callback(null,'../uploads/fewstep');
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
router.post('/fewstepitems/', upload.single('gridimage'), verifyTokens, async (req,res) => {
    
    //create new items
    const originalName = req.file.originalname.split(' ').join('');
    const fewstepitems = new fewstepItemsDetails({
        gridheader: req.body.gridheader,
        gridcontent: req.body.gridcontent,        
        gridimage: {
            data:req.file.filename,
            contentType:'image',
            fileName: date + '-' + originalName.toLowerCase()
        }  
    });
   
    try {
        const newFewStepItems = await fewstepitems.save();
        res.status(201).json(newFewStepItems);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/fewstepitems/', async (req,res) => {
    try {
        const fewstepitems = await fewstepItemsDetails.find();
        res.json(fewstepitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/fewstepitems/:id',  getFewStepItems , (req,res) => {
    try {
        res.json(res.fewstepitems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/fewstepitems/:id', verifyTokens, getFewStepItems , async (req,res) => {

    if(req.body.gridheader != null){
        res.fewstepitems.gridheader = req.body.gridheader;
    }
    if(req.body.gridcontent != null){
        res.fewstepitems.gridcontent = req.body.gridcontent;
    }      

    try {
       const updatedFewStep = await res.fewstepitems.save()
       res.json(updatedFewStep) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/fewstepitems/:id', upload.single('gridimage'), verifyTokens, getFewStepItems , async (req,res) => {

    const originalName = req.file.originalname.split(' ').join('');
    console.log(originalName)
    res.fewstepitems.gridimage = {
        data:req.file.filename,
        contentType:'image',
        fileName: date + '-' + originalName.toLowerCase()
    }

    try {
       const updatedFewStep = await res.fewstepitems.save()
       res.json(updatedFewStep) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/fewstepitems/:id', verifyTokens,  getFewStepItems, async (req,res) => {
    try {
        await res.fewstep.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFewStepItems(req, res, next){
    let fewstepitems
    try {
        fewstepitems = await fewstepItemsDetails.findById(req.params.id)
        if(fewstepitems == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.fewstepitems = fewstepitems
    next();
}


module.exports = router;