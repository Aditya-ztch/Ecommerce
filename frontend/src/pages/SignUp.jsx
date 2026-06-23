import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { toast,ToastContainer } from 'react-toastify';



function SignUp() {
  const [details,SetDetails]=useState({Fname:"",Lname:"",Email:"",Password:"",Dob:"",Gender:"",Address:""})
  const [validated, setValidated] = useState(false);
  const handleChange=(e)=>{
     SetDetails({...details,[e.target.name]:e.target.value});
  }

  const handleSubmit = (event) => {
   
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
       event.stopPropagation();
       toast.error("All fields are required")
        setValidated(true);
        return;

    }
    else{
    try {
        axios.post('http://localhost:3000/api/SignUp',details).then(res=>{
          
          event.target.reset();
          console.log(res.data.message);
          toast.success("User Registered Successfully");
      }
        
      )
    } catch (error) {
      toast.error("Failed to register");
      console.log("Error:",error);
     
      
    }
    }

   
  };

  return (
    <>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'749px',backgroundColor:'#F1E2D1'}}>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{margin:'5px'}}>
        <fieldset style={{backgroundColor:'#B0BA99',padding:'50px',borderRadius:'30px 10px'}}>
          <legend className='row'><h3 style={{textAlign:'center',marginBottom:'10px',textDecoration:'underline'}}>SignUp</h3></legend>
           <Row className="mb-3">
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="Fname"
            onChange={handleChange}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="Lname"
            onChange={handleChange}
           
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              name="Email"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustomPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              aria-describedby="inputGroupPrepend"
              required
              name="Password"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId="validationCustomDob">
          <Form.Label>DOB</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="date"
              aria-describedby="inputGroupPrepend"
              required
              name="Dob"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Date of Birth.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Gender</Form.Label>
          <InputGroup hasValidation  >
           <div className='form-radio m-2 '>
            <input type="radio" className='form-radio-input ' id='Male' name='Gender' value={"Male"} onChange={handleChange}  />
            <label htmlFor="Male" className='form-radio-label '> Male</label>
          </div>
          <div className='form-radio m-2 '>
            <input type="radio" className='form-radio-input ' id='Female' name='Gender' value={"Female"}  onChange={handleChange} />
            <label htmlFor="Female" className='form-radio-label '> Female</label>
          </div>
          <div className='form-radio m-2 '>
            <input type="radio" className='form-radio-input ' id='Others' name='Gender' value={"Others"}  onChange={handleChange} />
            <label htmlFor="Others" className='form-radio-label '> Others</label>
          </div>
          </InputGroup>
          
         
            
          
       
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your Address" required name="Address" onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Address.
          </Form.Control.Feedback>
        </Form.Group>
        
       
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <div style={{display:'flex',justifyContent:'center'}}>
         <Button type="submit">Submit form</Button>
      </div>
     
        </fieldset>
     
    </Form>
    
    </div>
    <ToastContainer/>
    </>
    
  );
}

export default SignUp;
