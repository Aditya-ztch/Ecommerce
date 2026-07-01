const express=require('express');
const router=express.Router();
const{
    AddProduct,GetProducts,
    DeleteProduct,UpdateProduct,
    FilterProductOnPrice,
    FilterProductOnRating
}=require("../Controller/Products")
router.get("/get-products",GetProducts);
router.post("/add-product",AddProduct);
router.delete("/delete-product/:id",DeleteProduct);
router.put("/update-product/:id",UpdateProduct);
router.get("/product-price",FilterProductOnPrice);
router.get("/product-rating",FilterProductOnRating);

module.exports=router;