const express = require('express');
const router = express.Router();
const footerDetails = require('../../model/home/footer');
const verifyTokens = require('../verifyTokens/verifyTokens');

// Creating one
router.post('/footer/', verifyTokens, async (req,res) => {
    
    //create new item
    const footer = new footerDetails({        
        items: req.body.items
    });
   
    try {
        const newFooter = await footer.save();
        res.status(201).json(newFooter);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/footer/', async (req,res) => {
    try {
        const footer = await footerDetails.find();
        res.json(footer);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/footer/:id',  getFooter , (req,res) => {
    try {
        res.json(res.footer);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/footer/:id', verifyTokens, getFooter , async (req,res) => {
    
    if(req.body.items != null){
        res.footer.items = req.body.items;
    }    

    try {
       const updatedFooter = await res.footer.save()
       res.json(updatedFooter) ;
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/footer/:id', verifyTokens, getFooter, async (req,res) => {
    try {
        await res.footer.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getFooter(req, res, next){
    let footer
    try {
        footer = await footerDetails.findById(req.params.id)
        if(footer == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.footer = footer
    next();
}


module.exports = router;