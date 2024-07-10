const express=require("express");
const router=express.Router({mergeParams:true});

const wrapasync=require("../utils/wrapasync.js");
const Listing=require("../models/listing.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");





//Index Route
router.get("/", wrapasync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));


//New Route
router.get("/new", isLoggedIn,(req, res) => {
   
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    }}).populate("owner");
    if(!listing){
   req.flash("error","Listing Does Not Exist");
   res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
}))  


//Create Route
router.post("/",isLoggedIn,validateListing, wrapasync(async(req,res,next)=>{
  
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New listing Created");
    res.redirect("/listings");
    
}))


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist");
        res.redirect("/listings");
         }
    res.render("listings/edit.ejs",{listing});
}) )


//update route
router.put("/:id",isLoggedIn,isOwner, validateListing
    ,wrapasync(async(req,res)=>{
    let {id}=req.params;
    let listing=Listing.findById(id);
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);


}))


//Delete Route
router.delete("/:id",isLoggedIn, isOwner,wrapasync(async(req,res)=>{
    let {id}=req.params;
   let deleted=await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted");

   res.redirect(`/listings`);


}))


module.exports=router;
