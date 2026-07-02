const express=require('express');
const router=express.Router();
const verifiedUser=require("../middleware/authUser")
const{AddProduct,DisplayCart,DeleteCartProduct}=require('../Controller/Cart')
router.post('/add-product/:uid/:pid',verifiedUser,AddProduct);
router.get('/display-cart/:userId',verifiedUser,DisplayCart);
router.delete('/delete-cartproduct/:id',verifiedUser,DeleteCartProduct);
module.exports=router;