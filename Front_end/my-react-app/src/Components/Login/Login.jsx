import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
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
                navigateTo('/')
                
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
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="submit" value="Login" />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
