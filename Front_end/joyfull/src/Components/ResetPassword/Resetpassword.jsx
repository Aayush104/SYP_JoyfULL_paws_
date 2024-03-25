import React, { useState } from 'react'
import './ResetPassword.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';

const Resetpassword = () => {
  const [confirmpass, setconfirmpass] = useState('');
const [newpass, setnewpass] = useState('');

const navigateTo = useNavigate()

const{email}=  useParams();
const {otp} = useParams()

const handleSubmit = async (e)=>{
  e.preventDefault()
if(confirmpass !== newpass){
  toast.warning('Please add same password in both Field',{
    theme: "colored",
  
  })


}else if(!confirmpass || !newpass){
  toast.error('Please Enter the password',{
    theme: "colored",
   
  })
}else if(newpass.length < 8){
  toast.info('Password must be atleast 8 Character',{
    theme: "colored",
   
  })

}
  else{
  const response = await axios.post(`http://localhost:5000/updatepass/${email}/${otp}`,{
    confirmpass,
    newpass
  })
if(response && response.data == 'Changed'){
  navigateTo('/login')
  setTimeout(() => {
    toast.success('Password has been changed Successfully',{

    })
  }, 300);
  

}
}
 
}


  return (
    <>
        <Navbar/>
    <div className='main_reset'>
 
     <form className='reset_form' onSubmit = {handleSubmit}>
     <h2>Enter New Password</h2>
        <div className='reset_inputs'>
            <div>
                <label>New Password</label>
                <input type='Password' className='password' value={newpass} onChange={(e)=>{
                  setnewpass(e.target.value);
                }}/>
            </div>
            <div>
            <label> Confirm Password</label>
                <input type='Password' className='password' value={confirmpass} onChange= {(e)=>{
                  setconfirmpass(e.target.value);

                }}/>
            </div>
            <button type='submit' className='pass_confirm'>Confirm</button>
        </div>
       
     </form>
   
    </div>
   
    </>
    
  )
}

export default Resetpassword
