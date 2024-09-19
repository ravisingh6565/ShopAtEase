const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

//register shop
exports.registerShop = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        req.body.address = JSON.parse(req.body.address);
        const file = await req.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
        const images = [{
            public_id:myCloud.public_id,
            url:myCloud.url
        }]
        req.body.images = images;
        console.log(req.body);

        const shop = await Shop.create(req.body);
        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//get all shops
exports.getAllShops = async (req, res, next) => {
    try {
        const shop = await Shop.find();
        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//update shop details
exports.updateShop = async (req, res, next) => {
    try {
        const address = {
            state: req.body.address.state,
            city: req.body.address.city,
            pinCode:req.body.address.pinCode,
            zipCode:req.body.address.zipCode,
            locality:req.body.address.locality,
            area:req.body.address.area,
            street:req.body.address.street
        }
        const newShopData = {
            shopName: req.body.shopName,
            ownerName: req.body.ownerName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            description: req.body.description,
            address
        }

        const shop = await Shop.findByIdAndUpdate(req.params.shopId, newShopData, {
            new: true,
            runValidators: false,      // i will see it later
            useFindAndModify: false,
        });

        

        if (!shop) {
            return next(res.status(400).json({
                success: false,
                message: "no shop exist with this id"
            }));
        }

        // const shop = await Shop.findById(req.params.shopId);
        // shop.shopName = req.body.shopName;
        // shop.ownerName = req.body.ownerName;
        // shop.phoneNumber = req.body.phoneNumber;
        // shop.email = req.body.email;
        // shop.description = req.body.description;
        // shop.address.state = req.body.address.state;
        // shop.address.city = req.body.address.city;
        // shop.address.pinCode = req.body.address.pinCode;
        // shop.address.zipCode = req.body.address.zipCode;
        // shop.address.locality = req.body.address.locality;
        // shop.address.area = req.body.address.area;
        // shop.address.street = req.body.address.street;

        // await shop.save();

        res.status(201).json({
            success: true,
            shop
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//get single shop details with all its products
exports.getSingleShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.params.shopId);
        const shopProducts = await Product.find({shopId: req.params.shopId});
        if(!shop){
            return next(res.status(404).json({
                success: false,
                message: "shop does not exist with this id"
            }))
        }
        if(!shopProducts){
            return next(res.status(404).json({
                success: false,
                message: "shop does not have any products"
            }))
        }
        res.status(201).json({
            success: true,
            shop,
            shopProducts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//get my shop
exports.getMyShop = async (req, res, next) => {
    try {
        const shop = await Shop.findOne({user:req.user.id});
        const shopProducts = await Product.find({shopId: req.params.shopId});
        if(!shop){
            return next(res.status(404).json({
                success: false,
                message: "shop does not exist with this id"
            }))
        }
        if(!shopProducts){
            return next(res.status(404).json({
                success: false,
                message: "shop does not have any products"
            }))
        }
        res.status(201).json({
            success: true,
            shop,
            shopProducts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
