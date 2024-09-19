const app = require("./app");
const dotenv = require("dotenv");
const db_conn = require('./config/database.js')
const cloudinary = require("cloudinary");
// const Razorpay = require("razorpay");
//config
dotenv.config({path:"backend/config/config.env"});

//connecting to Database
db_conn();

//Razorpay
// exports.instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });


//cloudinary
cloudinary.v2.config({
cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
api_key:process.env.CLOUDINARY_CLIENT_API,
api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://127.0.0.1:${process.env.PORT}`);
});