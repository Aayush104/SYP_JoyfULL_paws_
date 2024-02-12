import React from 'react'
import './Banner.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Banner = () => {
    const transition = { duration:6, type: 'spring' };
    const initialPosition = { opacity: 0 };
    const finalPosition = { opacity: 1 };
  
    return (
      <div className='b-wrapper'>
        <div className='banner'>
          <div className='slogans'>
            <motion.span
              transition={transition}
              initial={initialPosition}
              whileInView={finalPosition}
            >
              Want a pet For your Loved Ones?
            </motion.span>
            <motion.span
              transition={transition}
              initial={initialPosition}
              whileInView={finalPosition}
            >
              "Searching for a beloved companion to complete your family? Delight in Joyful Paws – Where every tail finds its forever family!"
            </motion.span>
            <NavLink to ="/register">
            <motion.button
              className='button'
              transition={transition}
              initial={initialPosition}
              whileInView={finalPosition}
            >
              Apply Now 🐩
            </motion.button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

export default Banner
