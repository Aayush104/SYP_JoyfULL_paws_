import React from 'react'
import Card from '../Card/Card'
import Gromming from '../../img/Gromming.png'
import Care from '../../img/Care.png'
import Fun from '../../img/Fun.png'
import  './Information.css';
import {motion} from 'framer-motion'

const Information = () => {
    const fadeIn = {
        hidden:{opacity:0},
        visible: {opacity: 1},
      };
      const transition ={duration:5, type:'spring'}
      return (
        <motion.div className='info-wrapper'
        variants ={fadeIn}
        initial = "hidden"
        whileInView="visible"
        transition={transition}
        >
    
        <motion.div  variants = {fadeIn}
        transition={transition} >
        <Card image={Gromming}  Title="Gromming Services" Desc ="Treat your pet to our baths, haircuts, and nail trims for a clean,
           healthy,and happy companion. Regular grooming is more than appearance; it's essential for their well-being.
           Contact us at 984601575588 for appointments."> </Card>
        </motion.div>
       
           <motion.div variants = {fadeIn}
            transition={transition}>
          <Card image={Care} Title="Veterinary 24/7" Desc ="For your furry friends, we're always available! Whether it's a regular check-up or a pet emergency, our expert team is on call. Reach out at (555) 123-4567 for round-the-clock, trusted vet care."> </Card>
           </motion.div>
           <motion.div variants={fadeIn}
            transition={transition}>
          <Card image={Fun} Title="Fun activities" Desc = "We've got a lineup of pet-perfect fun! From playful playgroups to exciting pet events, we've got it all. Keep your pets happy and engaged with our amazing recreational programs. Fun awaits your furry friend! 🐾"> </Card>
           </motion.div>
          
        </motion.div>
        
      )
    }

export default Information
