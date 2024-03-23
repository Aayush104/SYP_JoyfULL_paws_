import  { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { CgEnter } from 'react-icons/cg';
import {toast} from 'react-toastify';
const RegisterOtp = () => {
  const [otp, setOtp] = useState('');
  
  const abc = localStorage.getItem('otp');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const navigateTo = useNavigate();

  setTimeout(() => {
    localStorage.removeItem('otp');
  }, 120000);

  const handleback = () => {
    localStorage.removeItem('otp');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (abc === otp) {
      try {
        const response = await axios.post('http://localhost:5000/register', {
          Email: email,
          Username: username,
          Password: password,
        });

        if (response && response.data === "Registration successful") {
          navigateTo('/login');
          setTimeout(()=>{
            toast.success('Registered !! Procceed to Login ',{
              theme: "colored",
              position: "bottom-center"
            })
          },200)
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error('An error Occured! please try again',{
          theme: "colored"
        })
      }
    } else {
      console.log("OTP doesn't match");
      toast.warning('Invalid Otp',{
        theme: "colored"
      })

    
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getPass", {
        email
      });

      toast.success('Otp has been sent',{
        theme: "colored"
      })
    
      localStorage.setItem('otp', response.data);
    } catch (error) {
      console.error("An error occurred", error);
      toast.error('An error Occured',{
        theme: "colored"
      })
    }
  };

  return (
    <>
      <NavLink to={'/register'}>
        <button className='button2 otp_btns' onClick={handleback}>back</button>
      </NavLink>
      <div className='w-otp'>
        <form className='form_otp' onSubmit={handleSubmit}>
          <span>Check Your Email For Otp:</span>
          <div className='input_form'>
            <label>Enter the Otp:</label>
            <input
              type="text"
              id="otp"
              placeholder='Enter Otp here'
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              required
            />
          </div>
          <span className='resend' onClick={handleResend}>Resend Otp</span>
          <button type="submit" className='verify_btn'>Verify OTP</button>
        </form>
     
      </div>
    </>
  );
};

export default RegisterOtp;
