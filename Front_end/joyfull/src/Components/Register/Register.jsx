import React, { useState } from 'react';
import './Register.css';
import { NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigateTo = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !username || !password || !ConfirmPassword) {
          setMessage('Please Fill All Inputs');
      } else {
          try {
              const response = await axios.post('http://localhost:5000/register', {
                  Email: email,
                  Username: username,
                  Password: password,
                  Confirm : ConfirmPassword

              });
  
              if (response.data === 'Registration successful') {
                  console.log("User has been created");
                  setEmail('');
                  setUsername('');
                  setPassword('');
                  navigateTo('/Login')
              } 

              if(response.data == 'Password donot match'){
                setMessage('Problem while confirming password');
                setConfirmPassword( '')
              }
          } catch (error) {
             
            
              if (error.response && error.response.status === 400) {
                  setMessage('Email already exists. Please use another email.');
              } else {
                  setMessage('Oops! Something went wrong.');
              }
          }
      }
  };
  

    return (
        <div className="w-register">
            <NavLink to='/'>
                <p className='back'>
                 Back
                </p>
            </NavLink>

            <div className='m-register'>
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
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Register;
