import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {CartContext} from "../services/CartProvider"

function NavBar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");
  const {quant}=useContext(CartContext);

  

  

 
  const HandleLogout = () => {
    sessionStorage.removeItem("Token");
    toast.success("Logout Success");
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="primary-subtle"
        data-bs-theme="dark"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/256/11539/11539622.png"
              alt="logo"
              style={{
                width: "50px",
                height: "50px",
              }}
            />{" "}
            E-Mart
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/product">Products</Nav.Link>

            <NavDropdown title="Other Actions" style={{paddingRight:"10px"}}>
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/add-products">
                Add Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/update-products">
                Update Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/delete-products">
                Delete Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/filter-products">
                Filter Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
            </NavDropdown>

            {token && (
              <Nav.Link
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={HandleLogout}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>

        {token && (
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              width: "150px",
              height: "60px",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/cart")}
          >
            <img
              src="https://www.svgrepo.com/show/507423/shopping-cart.svg"
              alt="cart"
              style={{
                filter: "brightness(0) invert(1)",
                width: "35px",
                height: "35px",
              }}
            />

            {" "}Cart{" "}

            <sup
              style={{
                backgroundColor: "red",
                borderRadius: "10px",
                padding: "2px 6px",
                color: "white",
              }}
            >
              {quant}
            </sup>
          </button>
        )}
      </Navbar>

      <ToastContainer />
    </>
  );
}

export default NavBar;