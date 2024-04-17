// require('dotenv').config();
const mongoose = require("mongoose");


// const URI = `mongodb+srv://prithvijitbasak:Prithvijit10!@cluster0.bv6g5sv.mongodb.net/lm2?retryWrites=true&w=majority`;
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection to the database is successful");
        // console.log(process.env.MONGODB_URI);
    } catch(err) {
        console.log("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;