const express = require('express')
const router=express.Router()
const User=require('../models/User')

router.post("/creatuser",async(req,res)=>{
   try{
    const new_user= new User({ 
       name:"Agrima Bansal",
       password:"123456",
       email:"agrima0304@gmail.com",
       location:"lucknow"
     });
   await new_user.save();
     res.json(
       {success:true}
       )
   }
   catch(error)
   {
    console.log(error)
    res.json({success:false})
   }
 }) 

 module.exports=router;