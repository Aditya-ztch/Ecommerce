import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from './../pages/SignUp';
import CartProvider, { CartContext } from '../services/CartProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';




function NavBar() {
  const navigate=useNavigate();
  const{CartItems}=useContext(CartContext);
  const HandleLogout=()=>{
    if(sessionStorage.getItem('Token')){
    sessionStorage.removeItem('Token');
    toast.success("Logout Success")
    navigate('/login')
    }
    

  }
 
  
  return (
    <>
     
      <Navbar bg="primary-subtle" data-bs-theme="dark" style={{position:'sticky',top:'0',width:'100%',display:'flex',flexWrap:'wrap',alignContent:'space-evenly',zIndex:'1'}}>
        
   
          <Container >
    
          <Navbar.Brand href="/"><img src="https://cdn-icons-png.flaticon.com/256/11539/11539622.png" className='img-fluid'  style={{height:"50px",width:"50px"}}
          alt="" /> E-Mart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/product">Products</Nav.Link>
            <NavDropdown title="Other Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
              <NavDropdown.Item href="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/add-products">Add Products</NavDropdown.Item>
              <NavDropdown.Item href="/update-products">Update Products</NavDropdown.Item>
              <NavDropdown.Item href="/delete-products">Delete Products</NavDropdown.Item>
              <NavDropdown.Item href="/filter-products">Filter Products</NavDropdown.Item>
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
              </NavDropdown>
              
            
            
            <Nav.Link  style={{backgroundColor:'red',color:'whitesmoke',borderRadius:'5px'}} onClick={HandleLogout}>Logout</Nav.Link>
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
      <ToastContainer/>
    </>
  );
}

export default NavBar;
