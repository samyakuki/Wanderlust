const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");

const ejsMate=require("ejs-mate");

const path=require("path");
// const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
const wrapAsync=require("./utils/wrapasync.js");
const ExpressError=require("./utils/expresserror.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const wrapasync = require("./utils/wrapasync.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
// app.use(express.json());
app.engine("ejs",ejsMate);

const mongoUrl='mongodb://127.0.0.1:27017/wanderlust';
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}

app.listen(8080,()=>{
    console.log(`new request received `);
})


app.get("/",(req,res)=>{
    res.send("Hie I am root");
})

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



//Index Route
app.get("/listings", wrapasync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));



//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs",);
})  




//Show Route
app.get("/listings/:id", wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}))  


//Create Route
app.post("/listings",validateListing, wrapasync(async(req,res,next)=>{
    let result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
}))


//Edit Route
app.get("/listings/:id/edit", wrapasync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}) )

//Reviews Post Route
app.post("/listings/:id/reviews",validateReview,wrapasync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newRew=new Review(req.body.review);
    listing.reviews.push(newRew);
    await newRew.save();
    await listing.save();
    console.log("review saved");
    res.redirect(`/listings/${listing._id}`);
}))

  //Delte Post Route

  app.delete("/listings/:id/reviews/:reviewId", wrapasync(async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))




//update route
app.put("/listings/:id", validateListing
    ,wrapasync(async(req,res)=>{
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);


}))


//Delete Route
app.delete("/listings/:id", wrapasync(async(req,res)=>{
    let {id}=req.params;
   let deleted=await Listing.findByIdAndDelete(id);
   console.log(deleted);
   res.redirect(`/listings`);


}))



// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// })










//Error Handling

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("listings/error.ejs",{err});

})


















// app.get("/testlistings",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calunguete,Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("Sample Was Saved");
//     res.send("Succesful testing");
// })


