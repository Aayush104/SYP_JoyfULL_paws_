import React from 'react';
import './Main.css';
import InnerNav from '../InnerNav/InnerNav';
import { motion } from 'framer-motion';

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
    </div>
  );
}

export default Main;
