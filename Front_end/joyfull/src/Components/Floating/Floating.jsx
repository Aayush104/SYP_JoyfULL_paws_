import React from 'react'
import "./Floating.css"
import {motion} from 'framer-motion'

const Floating = ({image ,text,text2,photoOnRight}) => {
    const transition= {duration:4, type:'spring'};
    const initialPosition ={x:-500, opacity:0};
    const finalPosition ={x:0, opacity:1};
    
    const textAnimation = {
      delay: { duration:6, type: 'spring' },
      before: { x:400, opacity: 0 },
      after: { x:0, opacity: 1 },
    };
      
      return (
        <div className={`floatingdiv  fix2 ${photoOnRight ? 'reverse' : ''} container`}>
        <motion.img
        transition={transition}
        initial={initialPosition}
        whileInView={finalPosition}
        
         src={image}></motion.img>
       <div>
        <h2>{text2}</h2>
        <motion.p
         variants={textAnimation}
              initial="before"
              whileInView="after"
        >{text}</motion.p>
       </div>
          
        </div>
      )
    }
    

export default Floating
