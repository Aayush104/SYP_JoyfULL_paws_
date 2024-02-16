import React from 'react'

import './Contact.css'
import { IoLocation} from "react-icons/io5";
import { IoTimeSharp} from "react-icons/io5";
import {MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import {motion} from 'framer-motion'

const Contact = () => {
    const transition = {duration:4, type: 'spring'}
    const initialPosition ={x:-800, opacity:0};
    const finalPosition ={x:0, opacity:1};
    return (
      <div className='W-contact' id='Contact'>
      <motion.div className='heading_C'
      transition={transition}
      whileInView={finalPosition}
      initial={initialPosition}>
      <h1>Contact Us</h1>
      </motion.div>
      <div className='location grid grid-two-column fix2 '>
      <div className='C_desc'>
      <span>Get in Touch</span>
      <h1>Visit our office location or contact us today</h1>
      <h3>Our information</h3>
      <ul className='icons'>
        <li><IoLocation />
        Province No-1 Duhabi,Sunsari Nepal</li>
        <li><MdEmail /> aayushadhikari601@gmail.com</li>
        <li><FaPhone />9827102964</li>
        <li> <IoTimeSharp />to Friday 9:00am to 4:00pm</li>
      </ul>
  
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d892.1230159296002!2d87.2781721!3d26.5685809!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef726dbca3cd2b%3A0x958a55959c7c638d!2sDuhabi%20Area%20Police%20Station!5e0!3m2!1sen!2snp!4v1708099149534!5m2!1sen!2snp"
       width="630" 
       height="450"
        style={{borderRadius: "10px"}}
         allowfullscreen="" 
         loading="lazy" 
       >
      </iframe>
      </div>
  
  <div className='fix2 contacts'>
  <form>
      <div className=' grid grid-two-column'>
      <div><input className='username' type='text' id='username' placeholder='username'></input></div>
  <div><input className='email' type='email' id='email' placeholder='Your Email'></input></div>
  </div>
  
  <div>
  <input className='subject' type='text' id='subject' placeholder='Subject'></input></div>
  <div>
  <textarea placeholder='Your Message' style={{height: 200}}></textarea>
  </div>
  </form>
  
  
      </div>
  
      </div>
    
    )
  }
  

export default Contact
