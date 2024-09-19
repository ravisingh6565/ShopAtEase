const express = require("express");
const { registerShop, getAllShops, updateShop, getSingleShop, getMyShop } = require("../controllers/shopController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

router.route('/register/shop').post(isAuthenticatedUser, singleUpload, registerShop);
router.route('/shops').get(getAllShops);
router.route('/shop/update/:shopId').put(isAuthenticatedUser, updateShop);
router.route('/shop/:shopId').get(getSingleShop);
router.route('/my-shop').get(isAuthenticatedUser, getMyShop);

//admin
router.route('/admin/shops').get(isAuthenticatedUser,authorizeRoles("admin"), getAllShops);


module.exports = router;