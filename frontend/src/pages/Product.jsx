import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import{CartContext} from "../services/CartProvider"

const Product = () => {
  const [Products, setProducts] = useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(null);
  const{CartItems,setCartItems,addToCart}=useContext(CartContext);
  // console.log(CartItems);
 
  

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then((response) => {
        // console.log(response.data.Allproducts)
        setProducts(response.data.Allproducts);
      })
      .catch((error) => {
        console.log(error);
        seterror(error);
      }).finally(()=>{
        setloading(false);
      });
  }, []);
  if(loading){
    return(<p>Loading....</p>)
  }
  

  return (
    <div style={{backgroundColor:'#F1E2D1',display:'grid',gridTemplateColumns:'auto auto auto  ', gridAutoColumns:'250px',gap:'50px'}}>
      {Products.map((product) => (
        <div className="card" key={product._id} style={{textAlign:'center',margin:'10px',backgroundColor:'#810B38',color:'#F7F1DE',borderRadius:'20px'}}>
          <img  src={product.imageUrl}  alt="" className="card-img-top p-2" style={{width:'75%',height:'75%',alignSelf:'center'}}/>
          
          <div className="card-title" ><h4>{product.name}</h4></div>
          <div className="card-title" style={{fontSize:'12px',fontWeight:'bold',marginBottom:'20px'}}>Brand:{product.brand}</div>
          

          <div className="card-subtitle" style={{fontWeight:'bold',fontSize:'20px'}}>Rs {product.price}
            <br />
            <div style={{display:'flex',justifyContent:'center',gap:'10px'}}>
               <button style={{borderRadius:"10px",border:'none',width:'70%',margin:'10px',backgroundColor:'#a6813d',color:'blanchedalmond'}} onClick={()=>{addToCart(product)}}  >Add to Cart</button>
               
            </div>
           
            
          </div>
          

        </div>
      ))}
    </div>
  );
};

export default Product;