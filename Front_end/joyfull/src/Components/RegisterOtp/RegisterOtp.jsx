import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgEnter } from 'react-icons/cg';

const RegisterOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
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
    e.preventDefault(); // Prevent default form submission behavior

    if (abc === otp) {
      try {
        const response = await axios.post('http://localhost:5000/register', {
          Email: email,
          Username: username,
          Password: password,
        });

        if (response && response.data === "Registration successful") {
          navigateTo('/login');
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("OTP doesn't match");
      setMessage("Invalid Otp");

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getPass", {
        email
      });

     window.alert("Otp has been sent again Check You mail")
      setTimeout(() => {
        setMessage('');
      }, 3000);
      localStorage.setItem('otp', response.data);
    } catch (error) {
      console.error("An error occurred", error);
      setMessage("Internal error occurred");
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
        {message && <p className='error' style={{ textAlign: 'center' }}>{message}</p>}
      </div>
    </>
  );
};

export default RegisterOtp;
