const express=require('express')
const cartModel=require('../Models/CartModel');
const { default: mongoose } = require('mongoose');

//Add product to cart
const AddProduct=async(req,res)=>{
    const userId=req.params.uid;
    const productId=req.params.pid;
   try {
     const Cart=await cartModel.findOne({userId});
     
    if(Cart){
            //check wheather product already exists
    const product=Cart.products.find(item=>item.productId.toString()===productId);
    if(product){
        product.quantity+=1;
    }
    else{
        Cart.products.push({
            productId,
            quantity:1
        })
    }
    await Cart.save();
    return res.status(200).json({message:"Cart Updated",Cart})

        }
    else{
        const Cart= await cartModel.insertOne({
            userId,
            products:[{
                productId,
                quantity:1
            }]
        });
        
        return res.status(201).json({message:"Cart created and Product added",Cart})
   
     
    }
   
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"server error"})
    
   }

}
//Dispaly cart Product
const DisplayCart=async (req,res)=>{
    try {
        const products=await cartModel.aggregate([
            {$match:{userId:new mongoose.Types.ObjectId(req.params.userId)}},
            {$unwind:'$products'},
            {
                $lookup:{
                    from:'products',
                    localField:"products.productId",
                    foreignField:"_id",
                    as:"productsDetails"
                }
            },{
                $unwind:"$productsDetails"
            },{
                $project:{_id:0,
                    quantity:'$products.quantity',
                    product:'$productsDetails'},
            },
        ])
        res.status(200).json({products});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to getcart details"})
        
    }
};
//Delete product from cart 
const DeleteCartProduct=async(req,res)=>{
    const userId=req.params.id;
    const productId=req.query.product;
    try {
        const cartDetails=await cartModel.findOne({userId});
     
      
        const Product=cartDetails.products.find(item=>item.productId.toString()===productId);
        
    
        if(Product.quantity>1){

            Product.quantity--;
            await cartDetails.save();
            res.status(200).json({message:"Quantity decreased",Product})
        }
        else{
            const RemovedProducts=await cartModel.updateOne(
                {userId:new mongoose.Types.ObjectId(userId)},
                {
                    $pull:{
                products:{
                 productId:new mongoose.Types.ObjectId(productId),
                }                    }
                }
            );
            res.status(200).json({message:"removed successfully",RemovedProducts});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to clear cart details"})
        
    }
}

module.exports={AddProduct,DisplayCart,DeleteCartProduct}