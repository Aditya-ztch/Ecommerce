import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigate=useNavigate();
try {
    const token = sessionStorage.getItem('Token');
    if(token){
        return children         
  
    }
    else{
        return(
            <>
            
            {useEffect(()=>{ 
                alert("Please Login First")
                navigate('/')
            },[token])}
            </>
        )
    }

    
} catch (error) {
    console.log('token does not exist please login') ;
    return(
        <>
         <Navigate to={'/'}/>
        </>
       
        
    )   
}

  
}

export default ProtectedRoute
