import React, {useState} from 'react'
import "./Forget.css";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import {toast} from 'react-toastify'

const Forget = () => {
    
    const [email ,setEmail] = useState('');
    const [loading, setLoading] = useState(false)
   
    const navigateTo = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
       
        setTimeout(() => {
          setLoading(false)
       }, 5200);

        const response = await axios.post("http://localhost:5000/forgotpass",{
            email
        })
if (response && response.data == "Invalid"){
  toast.error('Invalid Email',{
    theme: "colored",
   
  })
  setLoading(false)
}
if (response && response.data == "success"){
  navigateTo(`/Otp/${email}`)

  setTimeout(() => {
    console.log(email)
    toast.info('Otp sent Successfully')
  },500);
  setLoading(false)
 
}
    }


  return (
    <>
  

    {loading ?
      <div className='loading-spinner'>
        <div className="spinner-container">
                        <HashLoader
                            color={'D0021B'}
                            loading={loading}
                            speedMultiplier={2}
                            size={80}
                        />
                        
                         <img src='https://lordicon.com/icons/wired/gradient/177-envelope-send.gif' width='100px'></img>
                      
                        
                    </div>
        </div>
        : 
       <>
       <div className='bck'>
       <NavLink to= '/login'>
       <button className='button'>back</button>
       </NavLink>
       </div>

       
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
     </> }
  
  </>
  )
}

export default Forget
