import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const AddProduct = () => {
   const [details,SetDetails]=useState({name:"",price:"",imageUrl:"",category:"",brand:"",rating:"",stock:"",description:""});
   const [validated, setValidated] = useState(false);
     const handleChange=(e)=>{
     SetDetails({...details,[e.target.name]:e.target.value});
     console.log(details);
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
        axios.post('http://localhost:3000/api/add-product',details,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then(res=>{
          
          event.target.reset();
          console.log(res.data.message);
          toast.success("Product Added Successfullt");
      }
        
      )
    } catch (error) {
      toast.error("Failed to Add Product");
      console.log("Error:",error);
     
      
    }
    }


   
  };
  return (
    <div style={{backgroundColor:'#F1E2D1',height:'100dvh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div style={{backgroundColor:'#b6fa9a',display:'flex',flexDirection:'column',width:'80%',height:'60%',padding:'2rem',borderRadius:'10px 20px'}}>
        <h2 style={{alignSelf:'center'}}>Add Product</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Product name"
            name='name'
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide Product name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Price"
            name='price'
            onChange={handleChange}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide Product price.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
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
            />

            <Form.Control.Feedback type="invalid">
              product image is required
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
    <Row className="mb-3">
        <Form.Group  md="4" style={{height:'40px'}} controlId="validationCustom03">
           <label className="col" htmlFor="category"  style={{width:'20%'}}>Choose a course:</label>
            <select name="courses" id="category" name='category' style={{width:'40%',height:'90%',borderRadius:'10px',border:'none'}} onChange={handleChange}>
            <option value=" " >----select the category----</option>
            <option value="electronics">Electronics</option>
            <option value="fashion" >Fashion</option>
            <option value="books">AI/ML</option>
            <option value="food">Food</option>
            <option value="furniture">Furniture</option>
            <option value="sports">Sports</option>
           
            
            </select>
        </Form.Group>
            </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="brand" required name='brand' onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please provide brand.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="text" placeholder="Ratings eg.'4.5'" onChange={handleChange} name='rating' required />
          <Form.Control.Feedback type="invalid">
            Please provide a ratings.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom06">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="Stock amount" name='stock' required onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please provid Stock amount.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} md="3"  controlId="validationCustom07">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description"name='description' onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">
            Please provide a Description.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    <div style={{display:'flex',justifyContent:'center'}}>
        <Button type="submit">Submit form</Button>
    </div>
      
    </Form>
    
    </div>
    <ToastContainer/>
    </div>
  )
}

export default AddProduct
