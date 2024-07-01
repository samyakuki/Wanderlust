const express=require("express");
const router=express.Router({mergeParams:true});

const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const Listing=require("../models/listing.js");
const {listingSchema,reviewSchema}=require("../schema.js");

const validateListing=(req,res,next)=>{
    let  {error}=listingSchema.validate(req.body);
    if(error){
    let errMsg=error.details.map((el)=>el.message);

    throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}



//Index Route
router.get("/", wrapasync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));


//New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs",);
})  




//Show Route
router.get("/:id", wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    if(!listing){
   req.flash("error","Listing Does Not Exist");
   res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}))  


//Create Route
router.post("/",validateListing, wrapasync(async(req,res,next)=>{
  
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New listing Created");
    res.redirect("/listings");
    
}))


//Edit Route
router.get("/:id/edit", wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist");
        res.redirect("/listings");
         }
    res.render("listings/edit.ejs",{listing});
}) )


//update route
router.put("/:id", validateListing
    ,wrapasync(async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);


}))


//Delete Route
router.delete("/:id", wrapasync(async(req,res)=>{
    let {id}=req.params;
   let deleted=await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted");

   res.redirect(`/listings`);


}))


module.exports=router;