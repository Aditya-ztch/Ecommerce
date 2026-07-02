import React,{useContext, useEffect, useMemo,useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';


const Cart = () => {
  const [CartItems, setCartItems] = useState([]);
  const [loading,setLoading]=useState(true);
  const HandleDelete=(pid)=>{
    const token =sessionStorage.getItem("Token");
    const payload=JSON.parse(atob(token.split(".")[1]));
    const uid =payload.userId;
    axios.delete(`http://localhost:3000/api/delete-cartproduct/${uid}?product=${pid}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    .then((response)=>{
      toast.success(response.data.message)
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  useEffect(()=>{
    const token =sessionStorage.getItem("Token");
    const payload=JSON.parse(atob(token.split(".")[1]));
    const uid =payload.userId;
     axios.get(`http://localhost:3000/api/display-cart/${uid}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
     }).then((response)=>{
     
      setCartItems(response.data.products);
      setLoading(false);
      
     }).catch((error)=>{
      console.log(error);
     })

  },[HandleDelete])
  const TotalAmount=useMemo(()=>{
         return CartItems.reduce((TotalAmount,item)=>{
          return TotalAmount+item.product.price*item.quantity;

         },0 )
          
         
    },[HandleDelete] )
  
  if(loading){
    return (
      <>
      <p>Loading...</p>
      </>
    )
  }
  // console.log(CartItems);
  // console.log(CartItems.length);
  // CartItems.map((items)=>{
  //   console.log(items);
  //    console.log(items.product);
  // console.log(items.quantity);

  // })
 
  
  
   

    return (
    
    <div style={{backgroundColor:'#F1E2D1',height:'100dvh'}}>

      {CartItems.length==0 ?
       (<h3 style={{textAlign:'center',}}>NO Elements are added to cart</h3>) 
        : 
        (CartItems.map((items) => (
        <div className="card col " key={items.product._id} style={{textAlign:'center',margin:'10px',backgroundColor:'#810B38',color:'#F7F1DE',borderRadius:'20px',}}>
          
        <div style={{display:'flex'}}>
            <img  src={items.product.imageUrl}  alt="" className="card-img-top p-2" style={{width:'20%',height:'20%',alignSelf:'left'}}/>
            <div>
                <div className="card-title" style={{alignSelf:'right'}} ><h4>{items.product.name}</h4></div>
          <div className="card-title" style={{fontSize:'12px',fontWeight:'bold',marginBottom:'20px',alignSelf:'right'}}>Brand:{items.product.brand}</div>
          
     <div className="card-subtitle" style={{fontWeight:'bold',fontSize:'20px',alignSelf:'right'}} >Quantity: {items.quantity}
          </div>
          <div className="card-subtitle" style={{fontWeight:'bold',fontSize:'20px',alignSelf:'right'}} >Rs {(items.product.price)*(items.quantity)}
          </div>
            <div className="card-body"><p>{items.product.description}</p>
            <p>Ratings:{items.product.rating }</p></div>
            </div>
          
          
          
            </div>
              <div >
          <Button className='btn btn-danger' onClick={()=>{HandleDelete(items.product._id)}}>Delete</Button>
            </div>
           
          

        </div>
      )))
        
    }
       <div className="card " >
         <h2 style={{textAlign:'center'}}>Total Price:₹{TotalAmount} </h2>
         <br />
         <button className='btn btn-primary'><h3>Buy Now</h3></button>
       </div>
       <ToastContainer/>
      
    </div>
   
  )
 }

export default Cart
