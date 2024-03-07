// import React, { useEffect } from 'react'
import Navbar  from '../Navbar/Navbar'
import './Otp.css'

const Otp = () => {

  return (
    <>
    <Navbar />
<div className='w-otp'>

  <form className='form_otp'>

  <div className='input_form'>
  <label>Enter the Otp:</label>
  <input
        type="text"
        id="otp"
        placeholder='Enter Otp here'
        required
      />
  </div>
 
     <button className='verify_btn'>Verify OTP</button>
  </form>

  </div>
 
 
    </>
    
  )
}

export default Otp
