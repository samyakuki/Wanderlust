const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const Listing=require("../models/listing.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");



const validateReview=(req,res,next)=>{
    let  {error}=reviewSchema.validate(req.body);
    if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");

    throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}





//Reviews Post Route
router.post("/",validateReview,wrapasync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newRew=new Review(req.body.review);
    listing.reviews.push(newRew);
    console.log(req.params.id);
    await newRew.save();
    await listing.save();
    console.log("review saved");
   req.flash("success","New Review created");

    res.redirect(`/listings/${listing._id}`);
}))

//Reviews Delete  Route

router.delete("/:reviewId", wrapasync(async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted");

    res.redirect(`/listings/${id}`);
}))


module.exports=router;