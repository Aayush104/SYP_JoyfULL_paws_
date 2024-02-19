import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protect = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5000/protected', { withCredentials: true });
             
            } catch (error) {
                console.error(error);
                navigateTo('/login');
            }
        };

        checkAuth();
    }, [navigateTo]);

    return null; // No need for any UI rendering
};

export default Protect;
