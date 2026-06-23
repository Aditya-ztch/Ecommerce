import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Product from './pages/Product';
import Home from './pages/Home.jsx';
import Landing from './pages/Landing.jsx';
import CartProvider from './services/CartProvider.jsx';
import Cart from './pages/Cart.jsx';




const App = () => {
  return(
    <div>
      <CartProvider>
      <BrowserRouter>
      
       <NavBar />
       <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/cart' element={<Cart/>}/>

       </Routes >
       
       </BrowserRouter>
       </CartProvider>
        

    
  </div>
  )
}

export default App
