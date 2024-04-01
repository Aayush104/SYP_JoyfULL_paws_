import React, { useState } from 'react';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import paw from "../../img/paw_print.jpg";
import {toast} from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";


import { motion } from 'framer-motion';

function Register() {   


    

    const transition = { duration: 2, type: 'autumn' }
    const initialPosition = { x: -200, y: 300} // Initial position off-screen
    const finalPosition = { x: 0 , y :0} // Final

    // data line ra pathauney kaam eta garinxa
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loading, setloading] = useState(false)
   
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();




        setTimeout(() => {
           setloading(false)
        }, 5000);


        if (!email || !username || !password || !ConfirmPassword) {
            toast.error('Please Fill All Inputs',{
                theme: "colored",

                
              })
            
        } else if(password.length < 8){
          toast.error('Password Must be atleast 8 credentials ',{
              theme: "colored",
              position: "bottom-center"
            })
        }else if(password !== ConfirmPassword){
            toast.warning('Incorrect Retyped Password',{
                theme: "colored",
              
              })
        }else{
            setloading(true)

           
            const response = await axios.post("http://localhost:5000/getPass",{
                email
            })

            if(response && response.data == "User exists"){
                setloading(false)
                toast.error('User already exist',{
                    theme: "colored",
                  
                    
                   
                  })

            }else{

            
                 localStorage.setItem('otp', response.data);
                 localStorage.setItem('email', email);
                 localStorage.setItem('username', username);
                 localStorage.setItem('password', password);
                navigateTo(`/registerOtp`)
                    
            }
        }
       
    };

    return (

        <>



        {loading ?
        <div className='loading-spinner'>
        <div className="spinner-container">
                        <HashLoader
                            color={'D0021B'}
                            loading={loading}
                            speedMultiplier={2}
                            size={80}
                        />
                        
                         <img src='https://lordicon.com/icons/wired/gradient/177-envelope-send.gif' width='100px'></img>
                      
                        
                    </div>
        </div>
        :       <div className="w-register">
                <div className='left_reg'>
                    <NavLink to='/'>
                        <p className='back'>Back</p>
                    </NavLink>
                    <motion.img initial={initialPosition}
              whileInView={finalPosition} 
              transition={transition}src="https://bimberonline.com/adopt/wp-content/uploads/sites/3/2023/12/img-slider-hero-03-min.png" alt="register-img" />
                </div>

                <div className='right_reg'>
                <div>
                <motion.img 
            src={paw} 
            alt="" 
            width="46px" 
          className='paw'
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }} // Continuous rotation animation
          />
          </div>
                <div>
                <motion.img 
            src={paw} 
            alt="" 
            width="46px" 
          className='paw3'
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }}
          />
          </div>
                    <div className='sign'>
                        <span>Welcome to Joyful Paws!</span>
                        <span>Sign Up and Spread the Joy! 🐾✨</span>
                        <form method="POST" className='register' id='register' onSubmit={handleSubmit}>
                            <div className="r_input">
                                <label>Username:</label>
                                <input    
                                    type="text"
                                    placeholder='Enter Your Name'
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="r_input">
                                <label>Email:</label>
                                <input
                                    placeholder='Enter Your email'
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="r_input">
                                <label>Password:</label>
                                <input
                                    placeholder='Enter Password'
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="r_input">
                                <label>Confirm Password:</label>
                                <input
                                    placeholder='Confirm Password'
                                    type="password"
                                    name="ConfirmPassword"
                                    value={ConfirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                           
                            <button className='button2' type="submit">Sign Up</button>
                          
                            <NavLink to='/Login'>
                                <button className='already'> Already have an account?</button>
                            </NavLink>
                        </form>
                    </div>

                    <div>
                <motion.img 
            src={paw} 
            alt="" 
            width="46px" 
          className='paw2'
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }}
          />
          </div>
                    <div>
                <motion.img 
            src={paw} 
            alt="" 
            width="46px" 
          className='paw4'
            animate={{ rotate: [0, 20, 0], 
            transition: { duration: 1, repeat: Infinity } }}
          />
          </div>
                </div>
            </div>}
      
        </>
    );
}

export default Register;
