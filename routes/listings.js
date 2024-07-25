const express=require("express");
const router=express.Router({mergeParams:true});

const wrapasync=require("../utils/wrapasync.js");
const Listing=require("../models/listing.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");

const upload = multer({ storage });


//Index Route
router.get("/", wrapasync(listingController.index));

//New Route
router.get("/new", isLoggedIn,listingController.new);

//Show Route
router.get("/:id", wrapasync(listingController.show));  

//Create Route
router.post("/",isLoggedIn, upload.single('listing[image]'),validateListing, wrapasync(listingController.create) ) ;

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapasync(listingController.edit) );

//update route
router.put("/:id",isLoggedIn,isOwner,  upload.single('listing[image]'),validateListing,wrapasync(listingController.update));

//Delete Route
router.delete("/:id",isLoggedIn, isOwner,wrapasync(listingController.delete));

module.exports=router;