const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync=require("../utils/wrapasync.js");
const passport=require("passport");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
    
})
router.post("/signup",async(req,res)=>{
    
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","Welcome To Wanderlust");
        res.redirect("/listings");

    }catch(e){
        req.flash("error",e.message);
        res.redirect("/listings/users/signup");
    }
})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
    
})

router.post("/login", passport.authenticate("local", { failureRedirect: '/listings/users/login',failureFlash:true, }),async (req,res)=>{
    req.flash("success","welcome back");
    res.redirect("/listings");
    
})
module.exports=router;