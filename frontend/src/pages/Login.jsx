import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
   const EmailRef=useRef('');
   const PasswordRef=useRef('');
   const navigate=useNavigate()
   const [validated, setValidated] = useState(false);
   
  const handleForm= async (event)=> {
      const form = event.currentTarget;
       event.preventDefault()
        if (!form.checkValidity()) {
         event.stopPropagation()
         setValidated(true);
         toast.error('No field Can be empty');
         return;
        }
        else{
         try {
           await axios.post('http://localhost:3000/api/login',{Email:EmailRef.current.value,Password:PasswordRef.current.value}).then(res=>{
            console.log(res.data.message);
            sessionStorage.setItem('Token',res.data.token);
            console.log("Token created Successfully");
            toast.success("User login successfully")
            setTimeout(()=>{
            navigate('/home');
            },3000)
          }
          )
          
         } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Login failed");
          
         }

        }
         

      }
  

  return (
    <>
    <div style={{backgroundColor:'#F1E2D1',display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',height:'100dvh'} }  >
      <Form className='needs-validation' noValidate  validated={validated} onSubmit={handleForm}>
        <fieldset style={{backgroundColor:'#CB2957',padding:'100px',borderRadius:'30px 10px',}} >
          <legend style={{textAlign:'center',textDecoration:'underline',marginBottom:'10px'}}><h3>Login</h3></legend>
          <Form.Group className="mb-3 pl-5" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  required ref={EmailRef}/>
        <div className="invalid-feedback">
         Enter valid Email
        </div>
        <div className="valid-feedback">
         Looks good!
        </div>
      </Form.Group>

      <Form.Group className="mb-3 pl-5" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required  ref={PasswordRef}/>
        <div className="invalid-feedback">
         Password field cannot be empty
        </div>
        <div className="valid-feedback">
         Looks good!
        </div>
      </Form.Group>
      <Form.Group className="mb-3 pl-5" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Terms and Condition" required />
      </Form.Group>
      <div style={{ width:'100%',display:'flex',justifyContent:'center'}}>
           <Button variant="primary" type="submit" style={{width:'100px'}} >
        Submit
      </Button>
      </div>
   
        </fieldset>
     
    </Form>
    </div>
    <ToastContainer/>
    </>
    
  );
}

export default Login;


