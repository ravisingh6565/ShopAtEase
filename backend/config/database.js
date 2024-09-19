const mongoose = require("mongoose");

const dbconn= ()=>{
 mongoose.connect(process.env.DB_URI).then((data)=>{
    console.log(`Mongodb Connected with Server : ${data.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
}


module.exports= dbconn