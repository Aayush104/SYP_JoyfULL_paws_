import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using react-router for NavLink
import Innernav from '../InnerNav/InnerNav';
import cookies from 'js-cookie';
import axios from 'axios';

const Mypost = () => {
  const userid = cookies.get('token');
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
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
      <div className='my_post'>
    
      <div className='featured_pets'>
      <div className='main_pet petsbox'>
        {detail.map((details) => (
          <div className='pet_box_span' key={details.id}>
            <img src={details.PetPhoto} alt='Pet' className='pet-image' />
            <span>{details.PetName}</span>
            <span>{details.PetLikings}</span>
            <NavLink to={`/Detail/${details.ID}`}>
              <button className='read_btn'>Read More</button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Mypost;
