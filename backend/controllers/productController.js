const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const ApiFeatures = require("../utils/apifeatures");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

//create product ---Seller
exports.createProduct = async(req,res,next)=>{
    try {
        const shop = await Shop.findOne({user: req.user._id});
        req.body.shopId = shop.id;
        const file = await req.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
        const images = [{
            public_id:myCloud.public_id,
            url:myCloud.url
        }]
        req.body.images = images;
        // req.body = JSON.parse(req.body);
        const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

//get products
exports.getAllProducts = async (req,res,next)=>{
    try {
        const resultPerPage = 5;
        const productCount = await Product.countDocuments();
        const apiFeatures = new ApiFeatures(Product, req.query);
        apiFeatures.search().filter().pagination(resultPerPage);
        let products =await apiFeatures.query;
    res.status(200).json({
        success:true,
        products,
        productCount
});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
    
}

//update product ---ADMIN
exports.updateProduct =async (req,res,next)=>{
    try {
        let product = await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({success: false, messsage: "product not found in database"});
    }
    else{
         product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success:true,
            product
        });
    }
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
    
}

// delete product  ---admin
exports.deleteProduct=async(req,res)=>{
    try{
        let product = await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({success:false, messsage:"data does not exist in database"});
    }
    else{

         await product.deleteOne();
        res.status(200).json({success:true, messsage:"product deleted successfully"});
        
    }
    } catch(error){
        res.status(400).json({success: false, message: error.message});
    }
    

}

// get single product

exports.getSingleProduct =async (req, res)=>{
    try {
        let product = await Product.findOne({_id:req.params.id});
    if(!product){
        res.status(500).json({
            success:false,
            messsage: "product not found"
        });
    }
    else{
        res.status(200).json({
            success:true,
            product
        });
    }
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
    
}

//create new review or update review
exports.createProductReview = async(req, res, next)=>{

    try {
        const {rating, comment, productId}= req.body;
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=> rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString()===req.user.id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.numOfReviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    });
    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:"review updated successfully"
    });
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
    
}

//get all reviews of a product
exports.getProductReviews = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.query.id);
        if(!product){
            return next(
                res.status(404).json({success: false, message: "product not found"})
            );
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews
        });
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

//delete review
exports.deleteReview = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.query.productId);
        if(!product){
            return next(
                res.status(404).json({success: false, message: "product not found"})
            );
        }
        const reviews =  product.reviews.filter(rev=> rev.id.toString() !== req.query.id.toString());
        let avg = 0;
        reviews.forEach((rev)=>{
            avg+=rev.rating;
        });
        let ratings;
        if(reviews.length === 0){
             ratings= 0;
        }
        else{
         ratings = Number(avg/(reviews.length));
        }
        const numOfReviews = Number(reviews.length);

        // await Product.findByIdAndUpdate(req.query.productId, {
        //     reviews,
        //     ratings,
        //     numOfReviews
        // },{
        //     new:true,
        //     runValidators:true
        // });

        product.reviews = reviews;
        product.ratings = ratings;
        product.numOfReviews = numOfReviews;
        await product.save();
        res.status(200).json({
            success:true    
        });
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}