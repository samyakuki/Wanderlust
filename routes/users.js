const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync=require("../utils/wrapasync.js");
const passport=require("passport");
const Listing=require("../models/listing.js");
const {saveRedirectUrl}=require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
    
})
router.post("/signup",async(req,res)=>{
    
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.logIn(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            
        req.flash("success","Welcome To Wanderlust");
        res.redirect("/listings");

        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/listings/users/signup");
    }
})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
    
})

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/listings/users/login',failureFlash:"Password /username is incorrect or username does not exist", }),async (req,res)=>{
    let {id}=req.params;
    req.flash("success","welcome back");
    let redirectUrl=res.locals.redirectUrl||`/listings`;
    res.redirect(redirectUrl);
    
})

router.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
})
module.exports=router;