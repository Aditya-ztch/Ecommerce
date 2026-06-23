import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from './../pages/SignUp';
import CartProvider, { CartContext } from '../services/CartProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';




function NavBar() {
  const navigate=useNavigate();
  const{CartItems}=useContext(CartContext);
 
  
  return (
    <>
     
      <Navbar bg="primary-subtle" data-bs-theme="dark" style={{position:'sticky',top:'0',width:'100%',display:'flex',flexWrap:'wrap',alignContent:'space-evenly',zIndex:'1'}}>
        
   
          <Container >
    
          <Navbar.Brand href="/"><img src="https://cdn-icons-png.flaticon.com/256/11539/11539622.png" className='img-fluid'  style={{height:"50px",width:"50px"}}
          alt="" /> E-Mart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/product">Products</Nav.Link>
            <Nav.Link href="/signup">SignUp</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          
          </Nav>
        </Container>
        
  
      <button   id='submit' className='btn btn-primary'style={{position:'absolute',right:'0',top:'0', width:'150px',height:'65px',fontWeight:'bolder',margin:'5px',fontSize:'larger'}} onClick={()=>{navigate('/cart')}}>
            <img
            src={'https://www.svgrepo.com/show/507423/shopping-cart.svg'}
            alt="logo"
            style={{
            filter: "brightness(0) invert(1)",
            width: "50px",
            height: "35px",
    
            }}/>Cart<sup style={{backgroundColor:'red',fontSize:'larger',borderRadius:"10px",}} > {CartItems.length}</sup>
           
          </button>

      
      </Navbar>
    </>
  );
}

export default NavBar;
