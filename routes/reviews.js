const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserror.js");
const Listing=require("../models/listing.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const {isLoggedIn,validateReview,isReviewauthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");


//Reviews Post Route
router.post("/",isLoggedIn,validateReview,wrapasync(reviewController.post));

//Reviews Delete  Route
router.delete("/:reviewId",isLoggedIn,isReviewauthor, wrapasync(reviewController.delete));

module.exports=router;