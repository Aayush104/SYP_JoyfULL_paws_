import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !username || !password) {
          setMessage('Invalid inputs');
      } else {
          try {
              const response = await axios.post('http://localhost:5000/register', {
                  email: email,
                  username: username,
                  password: password
              });
  
              if (response.data === 'Registration successful') {
                  console.log("User has been created");
                  setMessage('Registration successful');
                  setEmail('');
                  setUsername('');
                  setPassword('');
              } 
          } catch (error) {
              console.error(error);
              if (error.response && error.response.status === 400) {
                  setMessage('Email already exists. Please use another email.');
              } else {
                  setMessage('Oops! Something went wrong.');
              }
          }
      }
  };
  

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
