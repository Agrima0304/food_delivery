import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Footer from '../components/Footer'
import NavBar from "../components/NavBar"


export default function Login() {
  const [credentials,setcredentials]=useState({email:'',password:''})
    let navigate=useNavigate()
  const handleSubmit=async(e)=>{
     e.preventDefault();
     console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
     const response=await fetch("http://localhost:5000/api/loginuser",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
     body:JSON.stringify({email:credentials.email,password:credentials.password})
  })
     const json=await response.json()
     console.log(json)
     if(!json.success)
      {
      alert("enter valid credentials")
     }
     if(json.success)
     {
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate('/')
     }
  }
  const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  } 
  return (
    
    <div>
      <div><NavBar/></div>
          <div className='container'>
      <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>I am a new user </Link> 
</form>
    </div>
    <div> <Footer/></div>

    </div>
  )
}
