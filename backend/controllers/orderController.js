const Product = require("../models/productModel");
const Order = require("./../models/orderModel");

exports.createOrder = async(req, res, next)=>{
    try {
        const order = await Order.create({
            shippingInfo:req.body.shippingInfo,
            contact:req.body.contact,
            products:req.body.products,
            user:req.user.id,
            payment:req.body.payment
        });
    res.status(201).json({
        success:true,
        order
    })
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

exports.buyerGetOrders=async(req, res, next)=>{
    try {
        const order = await Order.find({user:req.user.id});
        if(order){
            res.status(200).json({
                success:true,
                order
            })
        }
        else{
        res.status(200).json({success: true, message:"No Order have been Placed yet"});
        }
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }

}

// exports.sellerGetOrders=async(req, res, next)=>{
//     try {
//         const shop = await Shop.findOne({user:req.user.id});
//         const shopId = shop.id;
//         const orders= await Order.find({})
//     } catch (error) {
//         res.status(400).json({success: false, message: error.message});
//     }

// }


//admin routes

//display orders
exports.displayOrders = async(req,res,next)=>{
try {
    const orders = await Order.find({});
    res.status(200).json({
        success:true,
        orders
    })
} catch (error) {
    res.status(400).json({success: false, message: error.message});
}
}

