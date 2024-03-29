import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie'
import paw from "../../img/log_paw.png";
import { toast } from 'react-toastify';
const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigateTo = useNavigate();


    useEffect(()=>{
        localStorage.removeItem('otp')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('email')
        
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/Login", {
                email: email,
                password: password
            });

            if (response.data.token) { // Check if response contains data in which token must there
                console.log("Login successful");
                const { token } = response.data;
            Cookies.set('token', token)
                navigateTo('/main'); 

                setTimeout(()=>{
                    toast.success('Login Success',{
                        position: "top-center"
                      })

                },200)
            }

           
        } catch (error) {
            console.error("Error:", error.response.data);
            if (error.response && error.response.status === 401) {
                toast.warning('Password doesnot Match',{
                    theme: "colored",
                 
                  })
            } else if (error.response && error.response.status === 404) {
                toast.warning('User Not Found',{
                    theme: "colored",
                   
                  })
            } else {
                toast.error('Error Login',{
                    theme: "colored",
                  
                  })
            }
        }
    };

    return (
        <div className="m-log">
            <NavLink to='/'>
                <p className='back'>
                    Back
                </p>
            </NavLink>

           
            <div className='w-log'>
                <div className='l-container'>
                    <span>JoyFull Paws</span>
                    <form className="login" onSubmit={handleSubmit}>
                        <div className='Email'>
                            <label>Email:</label>
                            <input type="email" id="email" placeholder='Enter Your mail' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='Pass'>
                            <label>Password:</label>
                            <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <NavLink to= '/forget'>
                        <p>Forget Password ?</p>
                        </NavLink>
                    

                    <img src={paw} className='paws_img'></img>
                       
                        <button type="submit" className='l-button'>Login</button>
                    </form>
                    <NavLink to='/register'>
                        <button className='C-btn'> Create An account?</button>
                    </NavLink>
                 
                </div>
            </div>

            
        </div>
    );
};

export default Login;
