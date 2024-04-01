import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Otp.css';
import axios from 'axios';
import { useState } from 'react';
import {toast} from 'react-toastify';



const Otp = () => {
  const [otp, setOtp] = useState('');

  const { email } = useParams();
  const navigateTo = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/handleotp/${email}`, {
        otp
      });
      if (response && response.data === "otp expire") {
        toast.warning('Otp has been expired',{
          theme: "colored"
        })
      }
    else  if (response && response.data === "valid") {
     

      navigateTo({
        pathname: `/resetPassword/${email}/${otp}`,
      
      });
      


      }else{
        toast.error('Invalid Email',{
          theme: "colored"
        })
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
        toast.error('Invalid Email',{
          theme: "colored"
        })
      }
      if (response && response.data === "success") {
        toast.success('Otp sent Successfully',{
          theme: "colored"
        })
      }
    } catch (error) {
      console.error('Error occurred while resending OTP:', error);
    }
  };

  return (
    <>
     <div className='bck'>
       <NavLink to= '/forget'>
       <button className='button'>back</button>
       </NavLink>
       </div>
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
       
      </div>
    </>
  );
};

export default Otp;
