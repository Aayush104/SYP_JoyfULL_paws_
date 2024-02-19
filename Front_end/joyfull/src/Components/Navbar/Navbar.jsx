import React from 'react';
import './Navbar.css';
import logo from "../../img/Logo.png";
import { RiArrowDropDownLine} from "react-icons/ri";

import {Link} from 'react-scroll'
import { NavLink,useNavigate } from 'react-router-dom';

const Navbar = () => {


  return (
    <div className="n-wrapper">
      <img src={logo} alt="Logo" />
      <nav className="navbar">
        <ul className="nav-links">

        <Link spy={true} to= 'Navbar' smooth={true}>
        <li className='nav-link'>
            Home
          </li>
        </Link>
          
        
          <li className='nav-link link'>
            About Us 
            <RiArrowDropDownLine className="arrow" size='1.8rem' />

            <ul className='drop-down'>
            <Link spy={true} to='Story' smooth={true}>
        <li>
          Our Story
          </li>
        </Link>
        <Link spy={true} to='Mission' smooth={true}>
          <li>Our Mission</li>
        </Link>
              
              <Link spy={true} to ='Testimonial' smooth={true}>
              <li>What people say about us?</li></Link>
            </ul>
          </li>

         <Link spy={true} to='Contact' smooth={true}>
        <li className='nav-link'>
           Contact Us
          </li>
        </Link>

<NavLink to = '/Login'>

          <li className='nav-link'>
            Log in
          </li>
          </NavLink>
          <li className='button'>Donate</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
