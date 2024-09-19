const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        state:{
            type:String,
            required:[true, "please enter state "]
        },
        city:{
            type:String,
            required:[true, "please enter city "]
        },
        pinCode:{
          type:Number,
          required:[true,"please enter pin code "]
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
    contact:{
        phoneNumber:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },
    products:[{
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        productId:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true
        }
    }],
  user:{
    type: mongoose.Schema.ObjectId,
    ref:"User",
    // required: true
},
payment:{
    method:{
        type:String,
        required:true
    },
    status:{
        type:String
    }
}
})

module.exports = mongoose.model("Order", orderSchema);

