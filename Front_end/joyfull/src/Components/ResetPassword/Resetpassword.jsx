import React from 'react'
import './ResetPassword.css'
import Navbar from '../Navbar/Navbar'

const Resetpassword = () => {
  return (
    <>
        <Navbar/>
    <div className='main_reset'>
 
     <form className='reset_form'>
     <h2>Enter New Password</h2>
        <div className='reset_inputs'>
            <div>
                <label>New Password</label>
                <input type='Password' className='password'/>
            </div>
            <div>
            <label> Password</label>
                <input type='Password' className='password'/>
            </div>
            <button type='submit' className='pass_confirm'>Confirm</button>
        </div>
      
     </form>
    </div>
   
    </>
    
  )
}

export default Resetpassword
