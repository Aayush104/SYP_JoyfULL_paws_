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
const Main = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 100 }, // y vaneko kaha hunxa view ma aaunu vanda aagdai vaneko
    visible: { opacity: 1, y: 0 },
  };

  const transition = { duration: 4, type: 'spring' };
  const initialPosition = { y: -200 } // Initial position off-screen
  const finalPosition = { y: 0 }

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
          >Where Every Adoption🦄 </motion.span>
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
          
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }} // Continuous rotation animation
          />
      <span>Featured Pets </span>
   


      </div>

<div className='main_pet'>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
<div className='pet_box'>
<img src={pet}></img>

<div className='pet_box_span'>
<span>Charlie</span>
<span>Loves to go out for walks and walks very good on a lead. He is very
 inquisitive and is always on the out look for rabbits. This boy adores human cuddles and loves to snuggle into you. </span>
 <button className='read_btn'>Read More</button>
 
</div>

</div>
</div>

      </div>
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Main;
