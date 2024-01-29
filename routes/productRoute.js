import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';


const router = express.Router()

//add product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//get all products
router.get('/get-product', getProductController);

// single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController);

//delete
router.delete('/delete-product/:pid', deleteProductController);

//filter
router.post('/product-filters', productFiltersController)

//product count
router.get('/product-count', productCountController)

//product per page
router.get('/product-list/:page', productListController);

//search
router.get('/search/:keyword', searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;