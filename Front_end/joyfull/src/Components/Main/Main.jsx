import React from 'react';
import './Main.css';
import InnerNav from '../InnerNav/InnerNav';
import Information from '../Information/Information';
import { motion } from 'framer-motion';
import pet from "../../img/1stpet.jpg";
import paw from "../../img/paw_print.jpg";
import { IoInformation } from 'react-icons/io5';
import Testimonial from '../Testimonial/Testimonial';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useState,useEffect } from 'react';         
import { NavLink } from 'react-router-dom';
import cookies from 'js-cookie'
import bgvideo from '../../img/Main_bg.mp4'


const Main = () => {
 

  const transition = { duration: 3, type: 'autumn' };
  const initialPosition = { x: -700 } // Initial position off-screen
  const finalPosition = { x: 0 }
  const transition1 = { duration: 3, type: 'autumn' };
  const initialPosition1 = { x: 700 } // Initial position off-screen
  const finalPosition1 = { x: 0 }

  const userid = cookies.get('token');

  // yaha dekhi backend saga connect garinxa
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/main',{
          headers :{
            "Authorization": `bearer ${userid}`
          }
      });
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
       
      }
    };
    fetchDetails();
  }, []);


  return (

    <>
      <InnerNav />
      <div className='bvideo'>
        <video src={bgvideo} muted loop autoPlay></video>
        <div className='v_span'>
        <motion.span
         initial={initialPosition}
              whileInView={finalPosition} 
              transition={transition}
        >Welcome to Joyful Paws💙</motion.span>
        <motion.span
         initial={initialPosition1}
              whileInView={finalPosition1} 
              transition={transition1}
        > Where smiles meet wagging tails in pure friendship🐇</motion.span>
        </div>
       
        
      </div>
    <div className='w-main'>
    
     
<Information />
      <div className='featured_pets'>
      <div className='head'>
      <span>Available pets</span>
      <motion.img 
            src={paw} 
            alt="" 
            width="50px" 
          className='paw_pic'
          
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }} // Continuous rotation animation
          />
      <span>Featured Pets </span>
   


      </div>
      <div className='main_pet petsbox'>
     
          {details.map(detail => (
            
              <div className='pet_box_span' key={detail.id}>
              <img src={detail.PetPhoto} className='pet-image' />
                <span>{detail.PetName}</span>
              <span>{detail.PetLikings.split(' ').slice(0, 30).join(' ')+"..."}</span>
  
                <NavLink to={`/Detail/${detail.ID}`}>
  <button className='read_btn'>Read More</button>
</NavLink>

                
              </div>
          
          ))}
      
</div>


      </div>
      <Testimonial />
      <Footer />
    </div>
    </>
  );
}

export default Main;
