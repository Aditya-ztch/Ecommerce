const Products=require('../Models/ProductModel');
const GetProducts=async(req,res)=>{
    try {
        const Allproducts=await Products.find();
    res.status(200).json({message:"product successfully called",Allproducts})
        
    } catch (error) {
        res.status(500).json({message:"Unable to fetch the products"})

        
    }
}
//Adding Product 
const AddProduct=async(req,res)=>{
    try {
        const AddedProduct =await Products.insertOne(req.body);
        res.status(200).json({message:"Product added Successfully",AddedProduct});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to add product"})
    }

}
//Deleting product 
const DeleteProduct=async(req,res)=>{
    try {
        const DeletedProduct=await Products.deleteOne({_id:req.params.id});
        res.status(200).json({message:"Product Deleted successfully",DeletedProduct});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to delete Product"})
        
    }
}
//Updating Product
const UpdateProduct=async(req,res)=>{
    try {
        const UpdatedProduct=await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true},
        );
        res.status(200).json({message:"Updated Succesfully",
            updatedProductDetails:UpdatedProduct})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to update the product"})
        
    }
}
//filter product based on price
const FilterProductOnPrice=async(req,res)=>{
    try{
        const FilteredProducts=await Products.find({
            $and:[
                {price:{$gte:Number(req.query.min)}},
                {price:{$lte:Number(req.query.max)}}
            ],
        });
        res.status(200).json(FilteredProducts);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Failed to Filter Products based on Price"});
    }
}
//Filter product based on rating
const FilterProductOnRating=async(req,res)=>{
    try {
        const FilteredProducts=await Products.find({
            rating:Number(req.query.rating),
        });
        res.status(200).json(FilteredProducts)
    } catch (error) {
        console.log(error);
         res.status(500).json({message:"Failed to Filter Products based on Price",FilterProductOnRatingDetails:FilterProductOnRating});
        
    }
}
// getting Product based on id
const getProductbyId=async(req,res)=>{
    try {
        const Product =await Products.findById(req.params.pid);
        res.status(200).json({message:"Product fetched Successfully",Product});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to fetch product"})
    }

}
module.exports={GetProducts,
    AddProduct,DeleteProduct,
    UpdateProduct,FilterProductOnPrice,
    FilterProductOnRating,getProductbyId};