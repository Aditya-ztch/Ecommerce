const express=require('express');
const router=express.Router();
const verifiedUser=require("../middleware/authUser")
const{
    AddProduct,GetProducts,
    DeleteProduct,UpdateProduct,
    FilterProductOnPrice,
    FilterProductOnRating,getProductbyId
}=require("../Controller/Products")
router.get("/get-products",verifiedUser,GetProducts);
router.get("/get-product/:pid",verifiedUser,getProductbyId);
router.post("/add-product",verifiedUser,AddProduct);
router.delete("/delete-product/:id",verifiedUser,DeleteProduct);
router.put("/update-product/:id",verifiedUser,UpdateProduct);
router.get("/product-price",verifiedUser,FilterProductOnPrice);
router.get("/product-rating",verifiedUser,FilterProductOnRating);

module.exports=router;