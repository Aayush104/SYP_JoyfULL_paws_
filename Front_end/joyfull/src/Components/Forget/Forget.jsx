import React, {useState} from 'react'
import "./Forget.css";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Forget = () => {
    
    const [email ,setEmail] = useState('');
    const [message ,setMessage] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const response = await axios.post("http://localhost:5000/forgotpass",{
            email
        })
if (response && response.data == "Invalid"){
    setMessage('Invalid Password')
}
    }

  return (
    <>
    <Navbar />
  <div className="forget-container">
    <h2>Forget Password</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
      <button type="submit">Send Otp</button>
      
    </form>
    {message && <p className='message'>{message}</p>}
  </div>
    </>
  
  )
}

export default Forget
