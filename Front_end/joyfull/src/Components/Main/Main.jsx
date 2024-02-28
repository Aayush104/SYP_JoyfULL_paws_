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
const Main = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 100 }, // y vaneko kaha hunxa view ma aaunu vanda aagdai vaneko
    visible: { opacity: 1, y: 0 },
  };

  const transition = { duration: 4, type: 'spring' };
  const initialPosition = { y: -200 } // Initial position off-screen
  const finalPosition = { y: 0 }



  // yaha dekhi backend saga connect garinxa
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/main');
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
       
      }
    };
    fetchDetails();
  }, []);


  return (
    <div className='w-main'>
      <InnerNav />
      <div className='w-mainIntro'>
        <div className='spans'>
      
          <motion.span
          transition={transition}
          initial= {initialPosition}
          whileInView={finalPosition}
          >Welcome to JoyfulPaw🤍 </motion.span>
      
          <motion.span
          transition={transition}
          initial= {initialPosition}
          whileInView={finalPosition}
          >Spread Joy, Save a Paw🐾 </motion.span>
      
          <motion.span
          transition={transition}
          initial= {initialPosition}
          whileInView={finalPosition}
          >Where Every Adoption </motion.span>
          <motion.span
          transition={transition}
          initial= {initialPosition}
          whileInView={finalPosition}
          >Tells a Story!📖 </motion.span>
          
        </div>
        <motion.div
          className='m-pets'
          variants={fadeIn}
          initial='hidden'
          animate='visible'
          transition={transition}
        >
          <img
            src="https://fullkit.moxcreative.com/pawpaw/wp-content/uploads/sites/12/2022/07/pet_home_.png"
            alt="Pet Home"
            width="480"
            height="340"
            className='pets'
          />
        </motion.div>
      </div>
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
                <span>{detail.PetLikings	}</span>

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
  );
}

export default Main;
