import React, { useState } from 'react';
import './Addpet.css';
import axios from 'axios';
// import { color } from 'framer-motion';
import Footer from '../Footer/Footer';
import InnerNav from '../InnerNav/InnerNav';

const AddPet = () => {
  const [petname, setPetName] = useState('');
  const [petgender, setPetGender] = useState('');
  const [pethealth, setPetHealth] = useState('');
  const [petsize, setPetSize] = useState('');
  const [petage, setPetAge] = useState('');
  const [petlikings, setPetLikings] = useState('');
  const [aboutpet, setAboutPet] = useState('');
  const [breed, setbreed] = useState('');
  const [petphoto, setPetPhoto] = useState(null); // Store file object

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('petname', petname);
    formData.append('petgender', petgender);
    formData.append('pethealth', pethealth);
    formData.append('petsize', petsize);
    formData.append('petage', petage);
    formData.append('petlikings', petlikings);
    formData.append('aboutpet', aboutpet);
    formData.append('breed', breed);
    formData.append('petphoto', petphoto); 

    try {
      const response = await axios.post("http://localhost:5000/Addpet", formData);

      if (response.data === 'success') {
        setMessage("Pet Added successfully");
        setMessageType("success");
        setAboutPet('');
        setPetAge('')
        setPetName('');
        setPetHealth('');
        setPetGender('');
        setPetLikings('');
        setAboutPet('');
        setbreed('');

      } else {
        setMessage("Fill all details. Please try again.");
        setMessageType("error");
      }
      
    } catch (error) {
      console.error('Error:', error);
      setMessage("Fill all valid details. Please try again.");
      setMessageType("error");
    
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setPetPhoto(e.target.files[0]);
  };

  return (
    <>
     <div>
     <InnerNav />
   
    <div className='W-Addpet'>
    
      <h2>List Your pet</h2>
      <div className='pet_form'>
        <form onSubmit={handleSubmit}>
          <div className='form_p'>
            <div className='left_form'>
              <div className='l-1'>
                <label htmlFor="petName">Pet Name:</label><br />
                <input type="text" id="petName" name="petName" placeholder='Enter Your Pet Name' value={petname} onChange={(e) => setPetName(e.target.value)} required />
              </div>
              <div className='l-1'>
                <label htmlFor="petGender">Add Pet Gender:</label><br />
                <select
                  id='petGender'
                  name='petGender'
                  value={petgender}
                  onChange={(e) => setPetGender(e.target.value)}
                  placeholder='Enter Your Pet Gender'
                >
                
                <option value='' disabled>Your Pet Gender ?</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
              <div className='l-1'>
                <label htmlFor="petHealth">Health:</label><br />
                <select
                  id='petHealth'
                  name='petHealth'
                  value={pethealth}
                  onChange={(e) => setPetHealth(e.target.value)}
                  required
                >
                 <option value='' disabled>Pet Vaccination</option>
                  <option value='vaccinated'>Vaccinated</option>
                  <option value='not-vaccinated'>Not Vaccinated</option>
                </select>
              </div>
              <div className='l-1' >
                <label htmlFor="petSize">Pet Size:</label><br />
                <select
                  id='petSize'
                  name='petSize'
                  value={petsize}
                  onChange={(e) => setPetSize(e.target.value)}
              
                  required
                >
     <option value='' disabled>Your Pet Size ?</option>
                
                  <option value='large' >Large</option>
                  <option value='medium'>Medium</option>
                  <option value='small'>Small</option>
                </select>
              </div>
              <div className='l-1'>
                <label htmlFor="petAge">Age:</label><br />
                <input type="text" placeholder='Your Pet Age?' id="petAge" name="petAge" value={petage} onChange={(e) => setPetAge(e.target.value)} required />
              </div>
              <div className='l-1'>
                <label htmlFor="petAge">Breed:</label><br />
                <input type="text" placeholder='Your pet Breed ?' id="breed" name="breed" value={breed} onChange={(e) => setbreed(e.target.value)} required />
              </div>
            </div>
            <div className='right_form'>
          
              <div className='l-1'>
                <label htmlFor="petLikings">Pet Likings:</label><br />
                <textarea id="petLikings" placeholder= "Behaviour and liking of your pet"  name="petLikings" rows="6" cols="80" value={petlikings} onChange={(e) => setPetLikings(e.target.value)} required maxLength="00"></textarea>
              </div>
              <div className='l-1'>
                <label htmlFor="aboutPet">About pet:</label><br />
                <textarea id="aboutPet" placeholder= "Write About Your pet..." name="aboutPet" rows="6" cols="80" value={aboutpet} onChange={(e) => setAboutPet(e.target.value)} required ></textarea>
              </div>
              <div className='l-2'>
                <label htmlFor="petPhoto">Pet Photo:</label><br />
                <input type="file" id="petPhoto" name="petphoto" onChange={handleFileChange} required />
              </div>
            </div>
          </div>
          <button className='button3' type="submit">Add</button>
          <p className={`message ${messageType === "success" ? "success" : "error"}`}>{message}</p>
        </form>
      </div>
     
    </div>
    <Footer />
    </div>
   

    </>
  );
}

export default AddPet;
