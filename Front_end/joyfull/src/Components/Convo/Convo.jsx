import React, { useState } from 'react';
import './Convo.css';
import InnerNav from '../InnerNav/InnerNav';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {toast} from 'react-toastify'

const Convo = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [texting, setText] = useState('');
  
 

  const userid = Cookies.get('token');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/sentEmail/${id}`, {
        email: email,
        subject: subject,
        text: texting
      }, {
        headers: {
          Authorization: `Bearer ${userid}`,
        },
      });

      if (response && response.data === "Successfull") {
       
        setSubject('');
        setText('');
        setEmail('');
        setTimeout(() => {
          toast.success("Your message has been sent successfully")
        }, 100);
        
      } else if (response && response.data === "Not valid") {
       
        setTimeout(() => {
          toast.error("Please input Valid details",{
            theme: 'colored'
          })
        },100);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error Occured",{
        theme: 'colored'
      })
    }
  }

  return (
    <>
      <InnerNav />
      <div className='w-convo'>
        <div className='m-convo'>
          <div></div>
          <div className='halka_heading'>
            <span>Send Mail</span>
            <span>😸Start Your adoption journey with us🐇</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Your Email</label>
              <input
                type='email'
                placeholder='Enter Your mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Subject</label>
              <input
                type='text'
                placeholder='Enter the subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                placeholder='Enter Your text'
                className='text_convo'
                value={texting}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <button type='submit' className='btn_convo'>Send</button>
         
          </form>
        </div>
      </div>
    </>
  )
}

export default Convo;
