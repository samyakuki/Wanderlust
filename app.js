const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const ejsMate=require("ejs-mate");
const path=require("path");
const methodOverride=require("method-override");
const ExpressError=require("./utils/expresserror.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const wrapasync = require("./utils/wrapasync.js");
const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");



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





app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);







//Error Handling

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})


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


