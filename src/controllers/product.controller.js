const express = require("express")  

const Movie = require("../models/product.models")
const router = express.Router();

const authenticate = require("../middleware/authenticate")
//const { body, validationResult } = require('express-validator');
router.post("/", authenticate , async (req,res) =>
{
    
  
    try {
        const user = req.user
        const movie = await Movie.create
        ({
            mname:req.body.mname,
           roles:req.body.roles,
            name:req.body.name,
            price:req.body.price,
            img_urls: ["www.google.com"],
            user:user.user._id
        })
      
        return res.status(201).json({movie})

    }
    catch(e)
    {
        return res.status(500).json({status:"failed", message: e.message})
    }
})  ;




router.get("/", async (req, res) => 
{
    const movies = await Movie.find().lean().exec();
    return  res.send(movies)

})

module.exports = router;

//http://localhost:1212/products
//http://localhost:1212/login