import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const DeleteProduct = () => {
   const HandleDelete=(pid)=>{
   const token=sessionStorage.getItem('Token');
   axios.delete(`http://localhost:3000/api/delete-product/${pid}`,{
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        toast.success('Product deleted successfully');
    }).catch(()=>{
        console.log(error);
        toast.error("Unable to delete product ")
    })

    }
    const[data,Setdata]=useState([])
    const token=sessionStorage.getItem('Token');
    useEffect(()=>{
        axios.get('http://localhost:3000/api/get-products',{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            
            
            Setdata(res.data.Allproducts);

        }).catch((error)=>{
            console.log(error);
            toast.error("error fetching the data")
        })

    },[HandleDelete])
  return (
    <div>
        <div style={{backgroundColor:'#810B38',color:'#F7F1DE'}}>
            <h1 style={{textAlign:'center',color:'#F7F1DE',textDecoration:'underline'}}>Delete Product</h1>
              <table   cellPadding={'10px'}  style={{border:'5px solid #810B38'}}>
                    <thead >
                        <tr style={{fontWeight:'bold'}}>
                        <td>Name</td>
                        <td>Price</td>
                        <td>ImageUrl</td>
                        <td>Category</td>
                        <td>Brand</td>
                        <td>Rating</td>
                        <td>Stock</td>
                        <td>Description</td>
                        <td>Action</td>
                        </tr>  
                    </thead>
                <tbody>
           {
            data.map((product)=>(
               
                  
                    <tr key={product._id} style={{backgroundColor:'#F7F1DE',color:'#810B38', width:'100%',border:'2px solid #810B38'}} >
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td><img src={product.imageUrl} style={{width:'15em',height:'15em'}} alt="" /></td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.rating}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td><Button className="btn btn-danger" onClick={()=>{HandleDelete(product._id)}}>Delete</Button></td>
                </tr>
                   
            ))
           }
           </tbody>
           </table>
        </div>

      <ToastContainer/>
    </div>
  )
}

export default DeleteProduct;
