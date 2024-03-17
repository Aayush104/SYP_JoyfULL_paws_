import React, { useState } from 'react';
import './Convo.css';
import InnerNav from '../InnerNav/InnerNav';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Convo = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [texting, setText] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // New state to determine message type

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
        setMessage("Your message has been sent successfully");
        setMessageType('success');
        setSubject('');
        setText('');
        setEmail('');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response && response.data === "Not valid") {
        setMessage("Not a valid email");
        setMessageType('error');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
      setMessageType('error');
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
            {message && <p className={`message_${messageType}`}>{message}</p>}
          </form>
        </div>
      </div>
    </>
  )
}

export default Convo;
