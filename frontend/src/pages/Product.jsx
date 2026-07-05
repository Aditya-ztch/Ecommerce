import React, { useContext, useEffect, useMemo, useState, } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import {CartContext} from "../services/CartProvider"



const Product = () => {
  const{cart,setcart,fetchCartQuantity,quant}=useContext(CartContext);
   
function AddToCart(productId){
    const token=sessionStorage.getItem('Token');
    const payload=JSON.parse(atob(token.split(".")[1]));
    const uid=payload.userId;
    const pid=productId;

  axios.post(`http://localhost:3000/api/add-product/${uid}/${productId}`,{},{
    headers:{
      authorization:`Bearer ${token}`
    }
  }).then((response)=>{
    // toast.success(response.data.message);
    setcart([...cart,pid]);
    toast.success("Product Added Successfully");
  })
  .catch((error)=>{
    console.log(error);
    seterror(error);

  })

   
  }
  
  const [Products, setProducts] = useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(null);

  // console.log(CartItems);
 
  

  useEffect(() => {
    const Token=sessionStorage.getItem('Token');
    axios
      .get('http://localhost:3000/api/get-products',{
        headers:{
          authorization:`Bearer ${Token}`,
        },
      })
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
    <>
    <div style={{backgroundColor:'#F1E2D1',display:'grid',gridTemplateColumns:'auto auto auto  ', gridAutoColumns:'250px',gap:'50px'}}>
      {Products.map((product) => (
        <div className="card" key={product._id} style={{textAlign:'center',margin:'10px',backgroundColor:'#810B38',color:'#F7F1DE',borderRadius:'20px',height:'25em',width:'25em'}}>
          <img  src={product.imageUrl}  alt="" className="card-img-top p-2" style={{width:'75%',height:'50%',alignSelf:'center'}}/>
          
          <div className="card-title" ><h4>{product.name}</h4></div>
          <div className="card-title" style={{fontSize:'12px',fontWeight:'bold',marginBottom:'20px'}}>Brand:{product.brand}</div>
          <div className="card-title" style={{fontSize:'12px',fontWeight:'bold',marginBottom:'20px'}}>Rating:{product.rating}</div>
          

          <div className="card-subtitle" style={{fontWeight:'bold',fontSize:'20px'}}>Rs {product.price}
          
            <div style={{display:'flex',justifyContent:'center',gap:'10px'}}>
               <button style={{borderRadius:"10px",border:'none',width:'70%',margin:'10px',backgroundColor:'#a6813d',color:'blanchedalmond'}} onClick={()=>{AddToCart(product._id)}}  >Add to Cart</button>
               
            </div>
           
            
          </div>
          

        </div>
      ))}
      
    </div>
    <ToastContainer/>
    </>
  );
};

export default Product;