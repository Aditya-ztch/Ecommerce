import React,{useRef,useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {CartContext} from "../services/CartProvider"
import { ToastContainer,toast } from 'react-toastify';

const FilterProduct = () => {
    const [products, Setproducts]=useState([]);
    const{cart,setcart,fetchCartQuantity,quant}=useContext(CartContext);
    const rating =useRef('');
    const max =useRef(0);
    const min =useRef(0);
       
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
    const HandlePrice=()=>{
        
        const token=sessionStorage.getItem('Token');
        axios.get(`http://localhost:3000/api/product-price?min=${min.current.value}&max=${max.current.value}`,{
             headers:{
                authorization:`Bearer ${token}`
            }
        }
        )
        .then((res)=>{
           
            Setproducts(res.data);
            toast.success("Successfully fetched product based on Price")
            
        })
        .catch((error)=>{
            console.log(error);
             toast.error('Unable to fetch products')    
        })
    }
    const HandleRating=()=>{
        
        const token=sessionStorage.getItem('Token');
        axios.get(`http://localhost:3000/api/product-rating?rating=${rating.current.value}`,{
             headers:{
                authorization:`Bearer ${token}`
            }
        }
        )
        .then((res)=>{
            
            Setproducts(res.data);
            toast.success("Successfully fetched product based on Ratings")
            
        })
        .catch((error)=>{
            console.log(error);
            toast.error('Unable to fetch products')        })
    }

  return (
    <div style={{backgroundColor:'#810B38',color:'#F7F1DE',minHeight:'100vh',maxHeight:'100%'}}>
      <h1 style={{textAlign:'center',textDecoration:'underline'}}>Filter Products</h1>
      
       <fieldset style={{display:'grid',gridTemplateColumns:'auto auto',gap:'10em',margin:'2em'}} >
         <div style={{display:'flex',flexDirection:'column'}}>
            <div>
             <label htmlFor="Rating"  style={{fontWeight:'bolder',margin:'1em'}}>Ratings:</label>
             <input type='text' placeholder='Enter the rating eg. 4.5' id='Rating' ref={rating} style={{width:'20em',height:'2.5em',borderRadius:'10px',padding:'10px',backgroundColor:'black',color:'#F7F1DE'}} />
            </div>
             
           
             <br />
                <button style={{marginLeft:'2em',width:'15em',height:'2.5em',fontWeight:'bold',justifySelf:'end'}} className='btn btn-warning'  onClick={()=>{HandleRating()}}>FilterBasedOnRating</button>
        </div>
        <div   style={{boder:'black',display:'flex',flexDirection:'column',}}>
             <div>
             <label htmlFor="min" style={{fontWeight:'bolder',margin:'1em'}}>Minimum Amount:</label>
             <input type='number' placeholder='Enter the minimum amount' id='min' ref={min} style={{width:'20em',height:'2.5em',borderRadius:'10px',padding:'10px',backgroundColor:'black',color:'#F7F1DE'}} />
           </div>
       
        
       <div>
             <label htmlFor="max" style={{fontWeight:'bolder',margin:'1em'}}>Maximum amount:</label>
             <input type='number' placeholder='Enter the maximum amount' id='max' ref={max} style={{width:'20em',height:'2.5em',borderRadius:'10px',padding:'10px',backgroundColor:'black',color:'#F7F1DE'}}/>
        </div>
        <br />
           <button style={{marginLeft:'10em',width:'15em',height:'2.5em',marginBottom:'1em',fontWeight:'bold'}} className='btn btn-warning' onClick={()=>{HandlePrice()}}>FilterBasedOnPrice</button>

        </div>
        
       </fieldset>
       <div >
        {products.length=='0' ?
        (<h1 style={{textAlign:'center'}}>No Product Found</h1>):(
            <div style={{display:'grid',gridTemplateColumns:'auto auto auto'}}>
                {  products.map((product) => (
        <div className="card" key={product._id} style={{textAlign:'center',margin:'10px',backgroundColor:' #F7F1DE',color:'#810B38',borderRadius:'20px',height:'25em',width:'25em'}}>
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
        )
      )}
            </div>
          )}
       </div>
       <ToastContainer/>
      
    </div>
  )
}

export default FilterProduct
