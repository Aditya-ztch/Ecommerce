import React,{useContext, useMemo} from 'react'
import { CartContext } from '../services/CartProvider'

const Cart = () => {
    const {CartItems,addToCart}=useContext(CartContext);
    const TotalAmount=useMemo(()=>{
         return (CartItems.reduce((total,product)=>
            total+product.price,0))
    },[CartItems] )
   

    return (
    
    <div style={{backgroundColor:'#F1E2D1',height:'100dvh'}}>

      {CartItems.length==0 ?
       (<h3 style={{textAlign:'center',}}>NO Elements are added to cart</h3>) 
        : 
        (CartItems.map((product) => (
        <div className="card col " key={product._id} style={{textAlign:'center',margin:'10px',backgroundColor:'#810B38',color:'#F7F1DE',borderRadius:'20px',}}>
          
        <div style={{display:'flex'}}>
            <img  src={product.imageUrl}  alt="" className="card-img-top p-2" style={{width:'20%',height:'20%',alignSelf:'left'}}/>
            <div>
                <div className="card-title" style={{alignSelf:'right'}} ><h4>{product.name}</h4></div>
          <div className="card-title" style={{fontSize:'12px',fontWeight:'bold',marginBottom:'20px',alignSelf:'right'}}>Brand:{product.brand}</div>
          

          <div className="card-subtitle" style={{fontWeight:'bold',fontSize:'20px',alignSelf:'right'}} >Rs {product.price}
          </div>
            <div className="card-body"><p>{product.description}</p>
            <p>Ratings:{product.rating }</p></div>
            </div>
           
          
          
            </div>
          

        </div>
      )))
        
      }
      <div className="card " >
        <h2 style={{textAlign:'center'}}>Total Price:₹{TotalAmount} </h2>
        <br />
        <button className='btn btn-primary'><h3>Buy Now</h3></button>
      </div>
      
    </div>
   
  )
}

export default Cart
