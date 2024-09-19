const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  ownerName: {
    type: String,
    required: [true, "Please enter shop owner name!"],
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
    required: true
},
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  description: {
    type: String,
  },
  address: {
    state:{
        type:String,
        required:[true, "please enter state where shop is located"]
    },
    city:{
        type:String,
        required:[true, "please enter city where shop is located"]
    },
    pinCode:{
      type:Number,
      required:[true,"please enter pin code where shop is located"]
    },
    zipCode: {
      type: Number,
      required: true,
    },
    locality:{
        type:String
    },
    area:{
        type:String
    },
    street:{
        type:String
    }
  },
  
  images:[{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
}
],
//   avatar: {
//     type: String,
//     required: true,
//   },
  
//   withdrawMethod: {
//     type: Object,
//   },
//   availableBalance: {
//     type: Number,
//     default: 0,
//   },
//   transections: [
//     {
//       amount: {
//         type: Number,
//         required: true,
//       },
//       status: {
//         type: String,
//         default: "Processing",
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now(),
//       },
//       updatedAt: {
//         type: Date,
//       },
//     },
//   ],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});


module.exports = mongoose.model("Shop", shopSchema);