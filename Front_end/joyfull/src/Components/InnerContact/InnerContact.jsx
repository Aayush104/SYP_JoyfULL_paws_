import React from 'react';
import './InnerContact.css';
import {motion} from 'framer-motion'
import InnerNav from '../InnerNav/InnerNav';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

const InnerContact = () => {
    const transition = { duration:6, type: 'spring' };
    const initialPosition = { opacity: 0 };
    const finalPosition = { opacity: 1 };
  return (
    <div className='iw-contact'>
      <InnerNav />
      <div className='iw-image'>
      <div className='iw-slogans'>
      <motion.span
      initial={initialPosition}
whileInView={finalPosition} 
transition={transition}
      >Get in Touch</motion.span>
         <motion.span
      initial={initialPosition}
whileInView={finalPosition} 
transition={transition}
      >Let's Collaborate and Create Magic Together!</motion.span>
        <motion.span   initial={initialPosition}
whileInView={finalPosition} 
transition={transition}>Reach out to us for any inquiries or support.</motion.span>
      </div>
       
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default InnerContact;
