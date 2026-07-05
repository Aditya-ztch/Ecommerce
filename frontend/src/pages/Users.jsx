import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const Users = () => {
const [users,Setusers]=useState([]);
const[loading,Setloading]=useState(true);
useEffect(()=>{
    const token=sessionStorage.getItem('Token');
    axios.get("http://localhost:3000/api/fetch-users",{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
         Setusers(res.data.userDetails);
         Setloading(false);
    })
    .catch((error)=>{
        console.log(error)
    })

},[]);
if(loading){
    return(
        <h2>Loading.....</h2>
    )
};
  return (
    <div>
         <div style={{backgroundColor:'#810B38',color:'#F7F1DE',minBlockSize:'100dvh',maxHeight:'100%'}}>
            <h1 style={{textAlign:'center',color:'#F7F1DE',textDecoration:'underline'}}>All Users</h1>
              <Table hover striped='columns' bordered cellPadding={'10px'}  style={{border:'5px solid #810B38',minWidth:'99dvw',maxWidth:'100%',}} >
                    <thead >
                        <tr style={{fontWeight:'bolder',textAlign:'center'}}>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Date Of Birth</td>
                        <td>Gender</td>
                        <td>Address</td>
                        <td>CreatedAt</td>
                        <td>UpdatedAt</td>
                        </tr>  
                    </thead>
                <tbody>
           {
            users.map((user)=>(
               
                  
                    <tr key={user._id} style={{backgroundColor:'#F7F1DE', width:'100%',border:'2px solid #810B38',textAlign:'center'}} >
                    <td>{user.Fname +' '+ user.Lname}</td>
                    <td>{user.Email}</td>
                    <td>{user.Dob}</td>
                    <td>{user.Gender}</td>
                    <td>{user.Address}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    </tr>
                   
            ))
           }
           </tbody>
           </Table>
        </div>
      
    </div>
  )
}

export default Users
