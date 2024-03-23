import React, {useState} from 'react'
import "./Forget.css";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';4
// import Otp from '../Otp/Otp';
import {toast} from 'react-toastify'

const Forget = () => {
    
    const [email ,setEmail] = useState('');
   
    const navigateTo = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const response = await axios.post("http://localhost:5000/forgotpass",{
            email
        })
if (response && response.data == "Invalid"){
  toast.error('Invalid Email',{
    theme: "colored"
  })
}
if (response && response.data == "success"){
 
  navigateTo(`/Otp/${email}`)

  setTimeout(() => {
    console.log(email)
    toast.info('Otp sent Successfully')
  },500);
 
}
    }


  return (
    <>
    <Navbar />
  <div className="forget-container">
    <h2>Forget Password</h2>
    <form onSubmit={handleSubmit}>
      <div className="email_form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          required
        />
      </div>
    
      <button type="submit" className='otp_btn'>Send Otp</button>
    
     
      
    </form>
 
  </div>
    </>
  
  )
}

export default Forget
