const express=require('express');
const router=express.Router();
const{AddProduct,DisplayCart,DeleteCartProduct}=require('../Controller/Cart')
router.post('/add-product/:uid/:pid',AddProduct);
router.get('/display-cart/:userId',DisplayCart);
router.delete('/delete-cartproduct/:id',DeleteCartProduct);
module.exports=router;