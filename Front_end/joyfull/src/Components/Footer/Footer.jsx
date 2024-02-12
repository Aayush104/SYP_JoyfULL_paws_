import './Footer.css'
import { FaFacebook } from "react-icons/fa6";
import {FaSquareInstagram } from "react-icons/fa6";
import {FaSquareWhatsapp} from "react-icons/fa6";
import {AiFillLinkedin } from "react-icons/ai";


const Footer = () => {
    return (
        <div className='f-wrapper'>
        <div className='fix2 footer'>
        <div className='f-services'>
          <h2>Our Services</h2>
          <p>Signup</p>
          <p>Other services</p>
          <h3>Follow us on</h3>
          <div className='f-icons'> <a href='https://www.facebook.com/aayush.chhetri.9406/'><FaFacebook /></a>
         <a href='https://www.instagram.com/_aayush.1086/'> <FaSquareInstagram /></a> 
         <a href = 'https://www.linkedin.com/in/aayush-adhikari-500900268/'><AiFillLinkedin /></a>
          <a href='#'><FaSquareWhatsapp /></a>
    
          </div>
    
        </div>
        <div className='f-contact'>
         
            <h2>Contact</h2>
            <p>Address: Province Number-1,Duhabi-5-Sunsari,Nepal</p>
          <p>Phone: 9827102964</p>
        <p>Hours: 9:00am-4:00pm, Sunday-Friday</p>
        </div>
        <div className='f-about'>
          <h2>About us</h2>
          <p>Our Story</p>
          <p>Our Mission</p>
          <p>What people say about Us?</p>
        </div>
    
        <div className='donate'>
    
        <h2>Help us to  grow</h2>
        <p>Click here to Donate us</p>
        <button className='button'>Donate</button>
        </div>
    
        <div className='f-credits'>
          <p>copyright ©2023 All rights reserved | ❤️ From Aayush Adhikari</p>
        </div>
        </div>
    
        </div>
      )
    }

export default Footer
