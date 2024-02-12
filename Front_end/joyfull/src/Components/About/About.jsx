import React from 'react';
import "./About.css";
import { motion } from 'framer-motion';

const About = () => {
    const transition = { duration: 4, type: 'spring' };
    const initialPosition = { x: -800, opacity: 0 };
    const finalPosition = { x: 0, opacity: 1 };
    const transition1 = { duration: 6, type: 'spring' };
    const initialPosition1 = { opacity: 0 };
    const finalPosition1 = { opacity: 1 };

    return (
        <div className='A-wrapper '>
            <motion.div className='heading'
                initial={initialPosition}
                whileInView={finalPosition}
                transition={transition}>
                <h1>About Us</h1>
            </motion.div>

            <div className='About'>
                <motion.span
                    transition={transition1}
                    initial={initialPosition1}
                    whileInView={finalPosition1}
                >
                    Discover Our Passion for Paws🐾
                </motion.span>
                <motion.span
                    transition={transition1}
                    initial={initialPosition1}
                    whileInView={finalPosition1}
                >
                    Know us!!
                </motion.span>
            </div>
        </div>
    );
};

export default About;
