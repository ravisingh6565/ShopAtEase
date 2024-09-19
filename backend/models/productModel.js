const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "please enter product name"],
        trim:true
    },
    description:{
        type: String,
        required:[true, 'please enter product description']
    },
    price:{
        type: Number,
        required:[true, 'please enter product price'],
        max:[99999999, 'price can not exceed more than 8 digits']
    },
    ratings:{
        type:Number,
        default:0
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
    }],
    category:{
        type:String,
        required:[true, "please enter category of product"]
    },
    stock:{
        type:Number,
        required:[true, "please enter number of stocks"],
        max:[9999, "Stock can not exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required: true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }   
    }],
    // user:{
    //     type: mongoose.Schema.ObjectId,
    //     ref:"User",
    //     required: true
    // },
    shopId: {
        type: mongoose.Schema.ObjectId,
        ref:"shop",
        required: true
      },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports= mongoose.model("Product", productSchema);