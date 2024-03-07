import React, {useState} from 'react'
import "./Forget.css";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';4
import Otp from '../Otp/Otp';

const Forget = () => {
    
    const [email ,setEmail] = useState('');
    const [message ,setMessage] = useState('');
    const navigateTo = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const response = await axios.post("http://localhost:5000/forgotpass",{
            email
        })
if (response && response.data == "Invalid"){
    setMessage('Invalid Email')
}
if (response && response.data == "success"){
  setMessage('Otp sent Successfully')


  setTimeout(() => {
    console.log(email)
    navigateTo(`/Otp/${email}`)
  },3000);
 
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
    {message && <p className='forgot_message'>{message}</p>}
  </div>
    </>
  
  )
}

export default Forget
