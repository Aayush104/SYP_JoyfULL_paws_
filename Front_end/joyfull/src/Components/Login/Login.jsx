import React, { useState } from 'react';
import { NavLink,useNavigate} from 'react-router-dom';

import './Login.css';
import axios from 'axios';

const Login = () =>{
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
const navigateTo = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/Login", {
                email: email,
                password: password
            });

            if (response.data === "Login successful") {
                console.log("Login successful");
                navigateTo('/main')
                
            }
        } catch (error) {
            console.error("Error:", error.response.data);
            if (error.response && error.response.status === 401) {
                setMessage("Password doesn't match");
            } else if (error.response && error.response.status === 404) {
                setMessage("User not found");
            } else {
                setMessage("Error logging in");
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
          <span>Log in</span>
            <form className="login" onSubmit={handleSubmit}>
            <div className='Email'>
            <label>Email:</label>
                <input type="email" id="email" placeholder='Enter Your mail' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='Pass'>
                <label>Password:</label>
                <input type="password" id="password" placeholder='Enter Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
               
                <button type="submit"  className='l-button' >Login</button>
            </form>
            <NavLink to='/register'>
            <button className='C-btn'> Create An account?</button>
          </NavLink>
            {message && <p className='error-message'>{message}</p>}
        </div>
        </div>
        </div>
    );
};

export default Login;
