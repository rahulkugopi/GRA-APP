const express = require('express');
const router = express.Router();
const MenuDetails = require('../../model/home/menu');
const verifyTokens = require('../verifyTokens/verifyTokens');


// Creating one
router.post('/menu/',  verifyTokens, async (req,res) => {
    
    //create new items    
    const menu = new MenuDetails({  
        active:req.body.active,      
        menu: req.body.menu,  
        filepath: req.body.filepath,  
        filename: req.body.filename,
        dropdownactive: req.body.dropdownactive,
        dropdownname: req.body.dropdownname              
    });
   
    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
      res.status(400).json({message : error});   
    }

});

// Getting all
router.get('/menu/', async (req,res) => {
    try {
        const menu = await MenuDetails.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Getting one
router.get('/menu/:id',   getMenu, (req,res) => {
    try {
        res.json(res.menu);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

// Updating one
router.patch('/menu/:id', verifyTokens, getMenu , async (req,res) => {
    
    if(req.body.active != null){
        res.menu.active = req.body.active;
    } 
    if(req.body.name != null){
        res.menu.name = req.body.menu;
    } 
    if(req.body.filepath != null){
        res.menu.filepath = req.body.filepath;
    } 
    if(req.body.filename != null){
        res.menu.filename = req.body.filename;
    }
    if(req.body.dropdownactive != null){
        res.menu.dropdownactive = req.body.dropdownactive;
    }
    if(req.body.dropdownname != null){
        res.menu.dropdownname = req.body.dropdownname;
    }        

    try {
       const updatedMenu = await res.menu.save()
       res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting one
router.delete('/menu/:id', verifyTokens, getMenu, async (req,res) => {
    try {
        await res.menu.remove();
        res.json({ message: 'Deleted Users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getMenu(req, res, next){
    let menu
    try {
        menu = await MenuDetails.findById(req.params.id)
        if(menu == null){
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.menu = menu
    next();
}


module.exports = router;