const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync=require("../utils/wrapasync.js");
const passport=require("passport");
const Listing=require("../models/listing.js");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");



router.get("/signup",userController.getSignup);

router.post("/signup",userController.postSignup);

router.get("/login",userController.getLogin);

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/listings/users/login',failureFlash:"Password /username is incorrect or username does not exist", }),userController.postLogin);

router.get("/logout",userController.getLogout);
module.exports=router;