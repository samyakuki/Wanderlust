const Review=require("../models/review");
const Listing=require("../models/listing.js");

module.exports.post=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newRew=new Review(req.body.review);
    newRew.author=req.user._id;
    listing.reviews.push(newRew);
    console.log(req.params.id);
    await newRew.save();
    await listing.save();
   req.flash("success","New Review created");

    res.redirect(`/listings/${listing._id}`);
}

module.exports.delete=async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted");

    res.redirect(`/listings/${id}`);
}