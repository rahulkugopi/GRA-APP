const express = require('express');
const router = express.Router();
const bannerDetails = require('../../model/home/banner');
const userDetails = require('../../model/users/users');
const verifyTokens = require('../verifyTokens/verifyTokens');
const multer = require('multer');

const date = Date.now();

//define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination:function(reqest,file,callback){
        callback(null,'../uploads/banner');
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
router.post('/banner/', upload.single('image'), async (req,res) => {
    
    //create new banner
    const originalName = req.file.originalname.split(' ').join('');
    const banner = new bannerDetails({        
        name: req.body.name,
        content: req.body.content,
        image: {
            data:req.file.filename,
            contentType:'image/png',
            fileName: date + '-' + originalName.toLowerCase()
        },
        buttonactive: req.body.buttonactive,
        buttonname: req.body.buttonname,
        buttonurl: req.body.buttonurl
    });
   
    try {
        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/banner/', async (req,res) => {
    try {
        const banner = await bannerDetails.find();
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/banner/:id',   getBanner, (req,res) => {
    try {
        res.json(res.banner);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/banner/:id',  getBanner , async (req,res) => {
   
    if(req.body.name != null){
        res.banner.name = req.body.name;
    }
    if(req.body.content != null){
        res.banner.content = req.body.content;
    }   
    if(req.body.image != null){
        res.banner.image = req.body.image;
    }
    if(req.body.buttonname != null){
        res.banner.buttonname = req.body.buttonname;
    }
    if(req.body.buttonurl != null){
        res.banner.buttonurl = req.body.buttonurl;
    }

    try {
       const updatedBanner = await res.banner.save()
       res.json(updatedBanner) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/banner/:id',  getBanner, async (req,res) => {
    try {
        await res.banner.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getBanner(req, res, next){
    let banner
    try {
        banner = await bannerDetails.findById(req.params.id)
        if(banner == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.banner = banner
    next();
}


module.exports = router;