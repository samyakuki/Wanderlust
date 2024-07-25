const Listing=require("../models/listing.js");

//index
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

// module.exports.

module.exports.new=(req, res) => {
   
    res.render("listings/new.ejs");
}

module.exports.show=async(req,res)=>{
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
}

module.exports.create=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url," ",filename);  
    const newListing= new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image.url=url;
    newListing.image.filename=filename;
    await newListing.save();
    req.flash("success","New listing Created");
    res.redirect("/listings");
}

module.exports.edit=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist");
        res.redirect("/listings");
         }
    let originalUrl=listing.image.url;
   originalUrl= originalUrl.replace("/upload","/upload/w_250");     
    res.render("listings/edit.ejs",{listing,originalUrl});
}

// module.exports.edit = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//         req.flash("error", "Listing Does Not Exist");
//         return res.redirect("/listings");
//     }

//     let originalUrl = listing.image.url;
//     console.log("Original URL before replace:", originalUrl);

//     originalUrl = originalUrl.replace("/upload", "/upload/h_30,w_25");
//     console.log("Modified URL after replace:", originalUrl);

//     res.render("listings/edit.ejs", { listing, originalUrl });
// };

// module.exports.edit = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);

//     if (!listing) {
//         req.flash("error", "Listing Does Not Exist");
//         return res.redirect("/listings");
//     }

//     let originalUrl = listing.image.url;
//     console.log("Original URL before replace:", originalUrl);

//     // Check if the URL contains the substring to replace
//     if (originalUrl.includes("/upload")) {
//         originalUrl = originalUrl.replace("/upload", "/upload/h_30,w_25");
//     } else {
//         console.log("URL does not contain '/upload'. No replacement made.");
//         // Optionally, handle URLs that don't match your expected pattern differently
//     }

//     console.log("Modified URL after replace:", originalUrl);

//     res.render("listings/edit.ejs", { listing, originalUrl });
// };


module.exports.update=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image.url=url;
        listing.image.filename=filename;
        await listing.save();
  
    }

    req.flash("success","Listing Updated");
                                
   res.redirect(`/listings/${id}`);
}

module.exports.delete=async(req,res)=>{
    let {id}=req.params;
   let deleted=await Listing.findByIdAndDelete(id);
   req.flash("success","Listing Deleted");

   res.redirect(`/listings`);
}