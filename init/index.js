const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";

main().then((res)=>{
    console.log("connected to Db")
}).catch((err)=>{
    console.log(err)
});

async function main(params) {
    await mongoose.connect(mongoUrl)
};

const initDb = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj, owner:"675fcff137f75e4073d5c87f"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized")
};

initDb(); 

