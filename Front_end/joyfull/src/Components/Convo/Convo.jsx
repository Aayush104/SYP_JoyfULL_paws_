import React, { useState } from 'react'
import './Convo.css'
import InnerNav from '../InnerNav/InnerNav'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Convo = () => {

  const[email,setemail] = useState('');
  const[subject,setSubject] = useState('');
  const[texting,settext] = useState('');
  const[message,setMessage] = useState('');
  
  const userid = Cookies.get('token');
  const {id} = useParams()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await axios.post(`http://localhost:5000/sentEmail/${id}`,
    {
      email: email,
      subject: subject,
      text: texting
    },{
      headers: {
        Authorization: `Bearer ${userid}`,
      
  },
    })

    if(response && response.data === "Successfull"){
      setMessage("You message has been sent successfully");
      setSubject('');
      settext(' ');
    setemail('');
    setTimeout(()=>{
      window.location.reload()
     },2000)

    }

    if(response && response.data == "Not valid"){
setMessage("Not valid Email")

setTimeout(()=>{
 window.location.reload()
},2000)
    }

  }


  return (
   
    <>
<InnerNav />

<div className='w-convo'>
<div className='m-convo'>
<div className='halka_heading'>
<span>Send Mail</span>
<span>😸Start You adoption journey with us🐇</span>
</div>

<form onSubmit={handleSubmit}>
<div>

<label>Your Email</label>
<input type='email' placeholder='Enter Your mail' value={email} onChange={(e)=>{
  setemail(e.target.value)

}}></input>
</div>
<div>
<label>Subject</label>
<input type='text' placeholder='Enter the subject' value={subject} onChange={(e)=>{
  setSubject(e.target.value)

}}></input>

</div>
<div>
<label>Message</label>
<textarea placeholder='Enter Your text' className='text_convo' value={texting} onChange={(e)=>{
  settext(e.target.value)
}}></textarea>
</div>
<button type='submit' className='btn_convo'>Send</button>


</form>
{message && <p>{message}</p>}
</div>

</div>
    </>
   
  )
}

export default Convo
