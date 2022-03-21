const express = require('express');
const router = express.Router();
const bannerDetails = require('../../model/home/banner');
const userDetails = require('../../model/users/users');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/banner/', async (req,res) => {
    
    //create new banner
    const banner = new bannerDetails({
        name: req.body.name,
        content: req.body.content,
        image: req.body.image,
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
    if(req.body.email != null){
        res.banner.email = req.body.email;
    }
    if(req.body.image != null){
        res.banner.image = req.body.image;
    }
    if(req.body.buttonname != null){
        res.banner.buttonname = req.body.buttonname;
    }
    if(req.body.buttonname != null){
        res.banner.buttonname = req.body.buttonname;
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