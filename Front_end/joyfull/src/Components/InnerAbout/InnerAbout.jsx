import React from 'react';
import InnerNav from '../InnerNav/InnerNav';
import { motion } from 'framer-motion';
import './InnerAbout.css';
import Story from '../Story/Story';
import Mission from '../Mission/Mission';
import Footer from '../Footer/Footer';

const InnerAbout = () => {
    const transition = { duration: 4, type: 'spring' };
    const initialPosition = { x: -800, opacity: 0 };
    const finalPosition = { x: 0, opacity: 1 };
    const transitions = { duration: 3, type: 'spring' };
    const initialPositions = { x: -600 }; // Initial position off-screen
    const finalPositions = { x: 0 }; // Final position at the top of the container

    return (
        <div className='w-iabout'>
            <InnerNav />

            <div className='ia_banner'>
                <div className='ia_slogans'>
                    <motion.span
                        initial={initialPositions}
                        whileInView={finalPositions}
                        transition={transitions}>
                        Know Us 😊Trust Us🤝 Love Us💙
                    </motion.span>
                    
                    <motion.span
                        initial={initialPositions}
                        whileInView={finalPositions}
                        transition={transitions}>
                        Discover Perfect Match for You With Us
                    </motion.span>
                </div>

               
            </div>

            <div className='o-about'>
               
                    
                    <motion.div className='heading'
                    initial={initialPosition}
                    whileInView={finalPosition}
                    transition={transition}>
                    <h1>About Us</h1>
                </motion.div>
                        
                   
                        <Story />
                   
                </div>
                <Mission />
                <Footer />
       </div>
    );
}

export default InnerAbout;
