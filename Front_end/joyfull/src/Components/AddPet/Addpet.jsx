import React, { useRef, useState } from 'react';
import './Addpet.css';
import axios from 'axios';

import InnerNav from '../InnerNav/InnerNav';
import cookies from 'js-cookie';
import { NavLink, useNavigate} from 'react-router-dom';
import { RxUpload } from "react-icons/rx";
import {toast} from 'react-toastify'

const AddPet = () => {
  const [petname, setPetName] = useState('');
  const [petgender, setPetGender] = useState('');
  const [pethealth, setPetHealth] = useState('');
  const [petsize, setPetSize] = useState('');
  const [petage, setPetAge] = useState('');
  const [petlikings, setPetLikings] = useState('');
  const [aboutpet, setAboutPet] = useState('');
  const [breed, setBreed] = useState('');
  const [petphoto, setPetPhoto] = useState(null);

 
  const [selectedFile, setSelectedFile] = useState(null);
  const navigateto = useNavigate()
 
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    
    fileInputRef.current.click();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = cookies.get('token'); // Fetch user token from cookies
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
    if(petphoto == null){
      toast.error("Add a photo.",{
        autoClose: 3000,
        theme: "colored",

      });
    }
  

   
   
else{
  try {
    
    const response = await axios.post("http://localhost:5000/Addpet", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${userId}` // Include the token in the request headers
      }
    });

    if (response.data === 'success') {

     navigateto('/Mypost')
     
     setTimeout(() => {
        toast.success("Your Pet has been listed",{
          position: "top-center",



        });
      }, 500);

    } else {
      toast.error("Fill all details. Please try again.",{
        transition: "Slide",

      });
     
    }
  } catch (error) {
    console.error('Error:', error);
   
    toast.error("Fill all details. Please try again.",{
      transition: "Slide",

    });
   
  }

}
   
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPetPhoto(e.target.files[0]);
  };

  return (
    <>
     <div>
     <InnerNav />
    
   
    <div className='W-Addpet'>
   <div className='heads'>
   <h2>List Your Pet</h2>
   </div>
    
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
                <input type="text" placeholder='Your pet Breed ?' id="breed" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />
              </div>
            </div>
            <div className='right_form'>
          
              <div className='l-1'>
                <label htmlFor="petLikings">Pet Likings:</label><br />
                <textarea id="petLikings" placeholder= "Behaviour and liking of your pet"  name="petLikings" rows="7.8" cols="65" value={petlikings} onChange={(e) => setPetLikings(e.target.value)} required ></textarea>
              </div>
              <div className='l-1'>
                <label htmlFor="aboutPet">About pet:</label><br />
                <textarea id="aboutPet" placeholder= "Write About Your pet..." name="aboutPet" rows="14" cols="65" value={aboutpet} onChange={(e) => setAboutPet(e.target.value)} required ></textarea>
              </div>
              <div className='l-2'>
                <label htmlFor="petPhoto">Pet Photo:</label><br />
      <div className='photo_div'>
      <input
                        type="file"
                        id="petPhoto"
                        name="petphoto"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                       
                      />
                      <div className='button_display'>
                      <button type="button" onClick={handleButtonClick} className='file_btn'>
                      Select Photo
                        <RxUpload fontSize={20} />
                      </button>
                     
                      </div>
                     
    
      </div>
              
      <p className='selectfile'>{selectedFile ? `Selected File: ${selectedFile.name}` : "No file selected"}</p>
              </div>
            </div>
          </div>
          <div className='buttonss'>
          <button className='button3' type="submit">Add</button>
          <NavLink to= '/main'>
          <button className='button4'>Back</button>
          </NavLink>
        
          </div>
        
         
        </form>
      </div>
    </div>
  
 
    </div>
    </>
  );
}

export default AddPet;
