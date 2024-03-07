import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Otp.css';
import axios from 'axios';
import { useState } from 'react';


const Otp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const { email } = useParams();
  const navigateTo = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/handleotp/${email}`, {
        otp
      });
      if (response && response.data === "otp expire") {
        setMessage("Otp has been expired");
      }
    else  if (response && response.data === "valid") {
      navigateTo('/resetPassword')
      }else{
        setMessage("Invalid Otp")
      }
    } catch (error) {
      console.error('Error occurred while handling OTP:', error);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/forgotpass", {
        email
      });
      if (response && response.data === "Invalid") {
        setMessage('Invalid Email');
      }
      if (response && response.data === "success") {
        setMessage1('Otp sent Successfully');
      }
    } catch (error) {
      console.error('Error occurred while resending OTP:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-otp'>
        <form className='form_otp' onSubmit={handleSubmit}>
          <div className='input_form'>
            <label>Enter the Otp:</label>
            <input
              type="text"
              id="otp"
              placeholder='Enter Otp here'
              required
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </div>
          <span onClick={handleResend} className='resend'>Resend Otp</span>
          <button type="submit" className='verify_btn'>Verify OTP</button>
        </form>
        {message && <p className='error_otp'>{message}</p>}
        {message1 && <p className='success_otp'>{message1}</p>}
      </div>
    </>
  );
};

export default Otp;
