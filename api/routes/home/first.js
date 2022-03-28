const express = require('express');
const router = express.Router();
const firstDetails = require('../../model/home/first');
const verifyTokens = require('../verifyTokens/verifyTokens');
const multer = require('multer');

const date = Date.now();

//define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination:function(reqest,file,callback){
        callback(null,'../uploads/firstsection');
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
router.post('/first/', verifyTokens, upload.single('image'), async (req,res) => {

    const originalName = req.file.originalname.split(' ').join('');
    const first = new firstDetails({
        visible:req.body.visible,
        header: req.body.header,
        content: req.body.content,
        image: {
            data:req.file.filename,
            contentType:'image/png',
            fileName: date + '-' + originalName.toLowerCase()
        }     
    });
   
    try {
        const newFirst = await first.save();
        res.status(201).json(newFirst);
    } catch (error) {
      res.status(400).json({message : error});   
    }
});

// Getting all
router.get('/first/', verifyTokens, async (req,res) => {
    try {
        const first = await firstDetails.find();
        res.json(first);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/first/:id', verifyTokens,  getFirst, (req,res) => {
    try {
        res.json(res.first);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/first/:id', verifyTokens, upload.single('image'), getFirst , async (req,res) => {
    
    if(req.body.visible != null){
        res.first.visible = req.body.visible;
    }
    if(req.body.header != null){
        res.first.header = req.body.header;
    }
    if(req.body.content != null){
        res.first.content = req.body.content;
    }   
    if(req.body.image != null){
        res.first.filename = req.file.filename;
    }

    
    try {
       const updatedFirst = await res.first.save()
       res.json(updatedFirst);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/first/:id', verifyTokens,  getFirst, async (req,res) => {
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