const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    let alllistings = await Listing.find({});
    res.render("listing/index.ejs", {alllistings})
};

module.exports.renderNewForm = (req,res)=>{ 
    res.render("listing/new.ejs")
};

module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews",populate:{path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listings")
    };
    console.log(listing);
    res.render("listing/show.ejs", {listing})

};

module.exports.createListing = async (req,res,next)=>{
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success", "new listing created!");
    res.redirect("/listings")   

};

module.exports.renderEditForm =  async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", " listing you requested for does not exist!");
        res.redirect("/listings")
    };
    res.render("listing/edit.ejs", {listing});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
     await Listing.findByIdAndUpdate(id , {...req.body.listing});
     req.flash("success", " listing is updated!");
     res.redirect(`/listings/${id}`);

 };

 module.exports.destroyListing = async(req,res)=>{
    let { id } = req.params;
     let deletListing =  await Listing.findByIdAndDelete(id);
     console.log(deletListing);
    req.flash("success", "listing deleted");
    res.redirect("/listings")
};