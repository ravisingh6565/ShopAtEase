// const { instance } = require("../server");
const Razorpay = require("razorpay");
var instance = new Razorpay({ key_id: 'rzp_test_DFJaRXBU8oVv1d', key_secret: 'd6axdVRnsscYg4KviGLq0CS3' })
const crypto = require("crypto");
const Order = require("../models/orderModel");


let orderDetails;
exports.checkout = async (req, res, next) => {
  // console.log("look here"+req.body.orderDetails.shippingInfo.state);
  // console.log(req.body);
  orderDetails = req.body.orderDetails;


  const options = {
    amount: Number(req.body.totalAmount * 100),  // amount in the smallest currency unit
    currency: "INR"
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
    orderDetails:req.body.orderDetails
  });
}

exports.paymentVerification = async (req, res, next) => {
  // console.log(req.body);

  // var instance = new Razorpay({ key_id: 'rzp_test_DFJaRXBU8oVv1d', key_secret: 'd6axdVRnsscYg4KviGLq0CS3' })

  const {razorpay_order_id, razorpay_payment_id, razorpay_signature}= req.body;
  const body = razorpay_order_id +"|"+razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', instance.key_secret)
  .update(body.toString())
  .digest('hex')

  const isAuthenticated = expectedSignature === razorpay_signature;
  if(isAuthenticated){
    //saving in database
    console.log("user==="+orderDetails.user)
    try {
      const order = await Order.create({
          shippingInfo:orderDetails.shippingInfo,
          contact:orderDetails.contact,
          products:orderDetails.products,
          user:orderDetails.user,
          payment:orderDetails.payment
      });
  } catch (error) {
      res.status(400).json({success: false, message: error.message});
  }
    //saving in database then 
  //   try {
  //     const order = req.order;
  // res.status(201).json({
  //     success:true,
  //     order
  // })
  // } catch (error) {
  //     res.status(400).json({success: false, message: error.message});
  // }

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  }
  else{
    res.status(400).json({
      success: false
    });
  }
  
}