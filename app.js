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
const listingsRouter=require("./routes/listings.js");
const reviewsRouter=require("./routes/reviews.js");
const userRouter=require("./routes/users.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");


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

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};


app.get("/",(req,res)=>{
    res.send("Hie I am root");
})

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


app.listen(8080,()=>{
    console.log(`new request received `);
})




// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"s@gmail.com",
//         username:"student",
//     })
//    let registered=await User.register(fakeUser,"hello");
//    res.send(registered);
// })




app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/listings/users",userRouter);







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


