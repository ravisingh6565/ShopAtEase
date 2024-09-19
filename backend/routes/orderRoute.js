const express = require("express");
const { createOrder, buyerGetOrders, sellerGetOrders, displayOrders } = require("../controllers/orderController");
const {isAuthenticatedUser,authorizeRoles} = require("./../middleware/auth");
const router = express.Router();

router.route('/place-order').post(isAuthenticatedUser, createOrder);
router.route('/my-order').get(isAuthenticatedUser, buyerGetOrders);
// router.route('/seller-orders').get(isAuthenticatedUser,authorizeRoles("seller"), sellerGetOrders);

//admin route
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"), displayOrders);

module.exports = router;