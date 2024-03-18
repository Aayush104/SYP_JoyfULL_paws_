import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using react-router for NavLink
import Innernav from '../InnerNav/InnerNav';
import cookies from 'js-cookie';
import axios from 'axios';
import './Mypost.css'
import Footer from '../Footer/Footer';
import Reset from '../ResetPassword/Resetpassword';

const Mypost = () => {
  const userid = cookies.get('token');
  const [detail, setDetail] = useState([]);
 



  useEffect(() => {
    const fetchDetails = async () => {
      document.body.style.overflowY = 'auto'
      try {
        const response = await axios.get('http://localhost:5000/Mypost', {
          headers: {
            Authorization: `Bearer ${userid}`,
          },
        });
        setDetail(response.data); //data leko backeend bata aearako
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [userid]); 

  return (
    <div>
      <Innernav />
    
      <div className='my_pet'>
<div className='span_head'>
<span>Your Post</span>
</div>

      <div className='petbox '>
      
        {detail.map((details) => (
          <div className='pet_box_span' key={details.id}>
            <img src={details.PetPhoto} alt='Pet' className='pet-image' />
            <span>{details.PetName}</span>
            <span>{details.PetLikings.split(' ').slice(0, 30).join(' ')+"..."}</span>
            <NavLink to={`/SingleDetail/${details.ID}`}>
              <button className='read_btn'>Read More</button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>

    <Footer />
    </div>
  
  );
};

export default Mypost;
