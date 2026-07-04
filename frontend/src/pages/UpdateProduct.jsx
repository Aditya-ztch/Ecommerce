import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


const UpdateProduct = () => {
    const [details,SetDetails]=useState({
    _id:"",
    name:"",
    price:"",
    imageUrl:"",
    category:"",
    brand:"",
    rating:"",
    stock:"",
    description:""
});
    const [validated, setValidated] = useState(false);
    const[data,Setdata]=useState([]);
    const [show, setShow] = useState(false);
    const getProductOnId=(pid)=>{
        const token=sessionStorage.getItem('Token');
        axios.get(`http://localhost:3000/api/get-product/${pid}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            SetDetails(res.data.Product);
           
        }).catch((error)=>{
            console.log(error);
        })

        
    }
   
   
  
    const handleChange=(e)=>{
     SetDetails({...details,[e.target.name]:e.target.value});
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
   
    
    if (form.checkValidity() === false) {
      toast.error("All fields are required")
      
      event.stopPropagation();
      setValidated(true);
      return
    }
    else{
        const token=sessionStorage.getItem('Token');
        try {
        axios.put(`http://localhost:3000/api/update-product/${details._id}`,details,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then(res=>{
          
          event.target.reset();
          console.log(res.data.message);
          toast.success("Product Updated Successfullt");
        
      }
        
      )
    } catch (error) {
      toast.error("Failed to Update Product");
      console.log("Error:",error);
     
      
    }
    }


   
  };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    },[handleSubmit])
  return (
    <div>
        <div style={{backgroundColor:'#F1E2D1'}}>
            <h1 style={{textAlign:'center',textDecoration:'underline' ,color:'#810B38'}}>Update Product</h1>
            
              <table   cellPadding={'10px'}  style={{border:'5px solid #F1E2D1'}}>
                    <thead >
                        <tr style={{fontWeight:'bold',color:'#810B38'}}>
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
                
                 
                      <tr key={product._id} setpid={product._id} style={{backgroundColor:'#810B38',color:'#F7F1DE', width:'100%',border:'2px solid #F1E2D1'}} >
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td><img src={product.imageUrl} style={{width:'15em',height:'15em'}} alt="" /></td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.rating}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td> <button
                  className="btn btn-warning"
                  onClick={() => {handleShow();getProductOnId(product._id);}}
                >
                  Update
                </button>
                    </td>                   
                </tr>
                 
                

                   
            ))
           }
                  
           </tbody>
            <Offcanvas show={show} onHide={handleClose} style={{backgroundColor:'#F1E2D1',color:'#810B38',fontWeight:'bolder'}}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update the Product</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
            
           <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group  md="4" controlId="validationCustom00">
          <Form.Label>Product Id</Form.Label>
          <Form.Control
            required
            type="text"
            
            name='_id'
            onChange={handleChange}
            value={details._id}
            disabled
          />
          
        </Form.Group>
            
            
          <Form.Group  md="4" controlId="validationCustom01">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Product name"
            name='name'
            onChange={handleChange}
            value={details.name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide Product name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  md="4" controlId="validationCustom02">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Price"
            name='price'
            onChange={handleChange}
            value={details.price}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide Product price.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  md="4" controlId="validationCustom03">
          <Form.Label>Image Url</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">src</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Image_url"
              aria-describedby="inputGroupPrepend"
              name='imageUrl'
              onChange={handleChange}
              required
              value={details.imageUrl}
            />

            <Form.Control.Feedback type="invalid">
              product image is required
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
          <Form.Group  md="4" style={{height:'40px',margin:'10px'}} controlId="validationCustom03">
           <label className="col" htmlFor="category"  style={{width:'35%'}}>Choose a course:</label>
            <select name="courses" id="category" name='category' style={{width:'60%',height:'90%',borderRadius:'10px',border:'none'}} onChange={handleChange}>
            <option value=" " >----select the category----</option>
            <option value="electronics" >Electronics</option>
            <option value="fashion" >Fashion</option>
            <option value="books">AI/ML</option>
            <option value="food">Food</option>
            <option value="furniture">Furniture</option>
            <option value="sports">Sports</option>
           
            
            </select>
        </Form.Group>
      </Row>
    
      
          
      <Row className="mb-3">
        <Form.Group  md="6" controlId="validationCustom04">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="brand" required name='brand' onChange={handleChange} value={details.brand} />
          <Form.Control.Feedback type="invalid">
            Please provide brand.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  md="3" controlId="validationCustom05">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="text" placeholder="Ratings eg.'4.5'" onChange={handleChange} name='rating' required value={details.rating} />
          <Form.Control.Feedback type="invalid">
            Please provide a ratings.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  md="3" controlId="validationCustom06">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="Stock amount" name='stock' required onChange={handleChange} value={details.stock}/>
          <Form.Control.Feedback type="invalid">
            Please provid Stock amount.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group  md="3"  controlId="validationCustom07">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description"name='description' onChange={handleChange} required defaultValue={details.description}/>
          <Form.Control.Feedback type="invalid">
            Please provide a Description.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    <div style={{display:'flex',justifyContent:'center'}}>
        <Button type="submit" onClick={()=>{handleClose()}} className='btn btn-warning'>Update</Button>
    </div>
      
    </Form>
                    </Offcanvas.Body>
                     </Offcanvas>
          
           </table>
           
           
                   
        </div>

      <ToastContainer/>
    </div>
    
  )
}

export default UpdateProduct
