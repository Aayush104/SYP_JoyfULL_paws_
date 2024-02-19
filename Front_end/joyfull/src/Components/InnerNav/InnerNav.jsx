import './InnerNav.css';
import logo from "../../img/Logo.png";
import { RiArrowDropDownLine} from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import {Link} from 'react-scroll'
import { FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { NavLink, } from 'react-router-dom';
import Cookies from 'js-cookie';
const InnerNav = () => {


  const handleLogout = ()=>{
    Cookies.remove('token');
  
    
  }
  return (
    <div className="n-wrapper">
    <img src={logo} alt="Logo" />
    <nav className="navbar">
      <ul className="nav-links">

      <Link spy={true} to= 'Navbar' smooth={true}>
      <NavLink to= '/main'>
      <li className='nav-link '>
      <div className='h-link'>
      <IoHome className='home'/>
        
      </div>
     
          Home
        </li>
      </NavLink>
      
      </Link>
        
      <NavLink to = '/innerAbout'>
      <li className='nav-link link'>
        <div className='h-link'>
      <HiMiniUserGroup className='about'/>

      </div>
          About Us 
         
        </li>
      </NavLink>
      

     <NavLink to = '/innercontact'>
      <li className='nav-link'>
      <div className='h-link'>
      <FaPhoneAlt className='phone' />
        
      </div>
         Contact Us
        </li>
        </NavLink>
      <li className='nav-link link'>
      <div className='h-link'>
      <CgProfile  className='Admin'  size='1.8rem'/>
        
      </div>
        Admin
         <RiArrowDropDownLine className="admin_arrow" size='1.8rem' />
         
         <ul className='drop-down'>
          
      <li>
      <MdLibraryAdd className='Add-pet' size= '1.2rem'/>
        Add Pet
        </li>
      
    
        <li>
       <BsFillFileEarmarkPostFill className='Your_post' size= '1.1rem' />
        Your Post</li>
    
        <NavLink to= '/'>
        <li onClick={handleLogout}>
     
            <LuLogOut className='log_out'  size= '1.2rem'/>
            Sign Out</li>
        </NavLink>
           
          </ul>
        </li>
        
      


        <li className='button'>Donate</li>
      </ul>
    </nav>
  </div>
  )
}

export default InnerNav
