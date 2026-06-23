const Products=require('../Models/ProductModel');
const products=async(req,res)=>{
    try {
        const Allproducts=await Products.find();
    res.status(200).json({message:"product successfully called",Allproducts})
        
    } catch (error) {
        res.status(500).json({message:"Unable to fetch the products"})

        
    }
}
module.exports=products;