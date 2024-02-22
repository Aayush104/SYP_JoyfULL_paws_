import React from 'react'
import './Intro.css'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'


const Intro = () => {
    const transition = { duration: 3, type: 'spring' }
    const initialPosition = { y: -200 } // Initial position off-screen
    const finalPosition = { y: 0 } // Final position at the top of the container
  
    return (
      <div className='i-wrapper fix'>
        <div className='i_left'>
          <div className='i-slogan'>
            <motion.span
              initial={initialPosition}
              whileInView={finalPosition} 
              transition={transition}
            >
              "Joyful Paws: Where
            </motion.span>
            <motion.span
              initial={initialPosition}
              whileInView={finalPosition} 
              transition={transition}
            >
              Every Paw Finds a
            </motion.span>
            <motion.span
              initial={initialPosition}
              whileInView={finalPosition} 
              transition={transition}
            >
              New Joyful Home !"
            </motion.span>
          </div>
          <div className='login'>
          <NavLink to = "/register">
    <motion.button
      initial={initialPosition}
      whileInView={finalPosition}
      transition={transition}
      className='button i_button'
      
    >
      Join Us
    </motion.button>
    </NavLink>
  </div>
        </div>
      </div>
    )
  }

export default Intro
