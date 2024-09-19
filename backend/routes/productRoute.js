const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, deleteReview, getProductReviews } = require("../controllers/productController");
const {  authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

// router.route("/products").get( getAllProducts);

// router.route("/product/:id").get(getSingleProduct);

router.route("/seller/product/new")
    .post(isAuthenticatedUser, authorizeRoles("seller"), singleUpload, createProduct);

router.route("/seller/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("seller"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/review").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

    
module.exports = router