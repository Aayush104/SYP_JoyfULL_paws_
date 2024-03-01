import React, { useEffect, useState } from 'react';
import './Edit.css'

import InnerNav from '../InnerNav/InnerNav';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();

  const [petname, setPetName] = useState('');
  const [petgender, setPetGender] = useState('');
  const [pethealth, setPetHealth] = useState('');
  const [petsize, setPetSize] = useState('');
  const [petage, setPetAge] = useState('');
  const [petlikings, setPetLikings] = useState('');
  const [aboutpet, setAboutPet] = useState('');
  const [breed, setBreed] = useState('');
  const [petphoto, setPetPhoto] = useState(null);
  const navigateto = useNavigate()


  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Edit/${id}`);
      
        // Update state with fetched data
        if (response.data && response.data[0]) {
          const petData = response.data[0];
          setPetName(petData.PetName);
          setPetGender(petData.PetGender);
          setPetHealth(petData.Health);
          setPetSize(petData.Petsize);
          setPetAge(petData.Age);
          setBreed(petData.Breed);
          setPetLikings(petData.PetLikings);
          setAboutPet(petData.AboutPet);
         setPetPhoto(petData.PetPhoto);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    get_data();
  }, [id]);

 
 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`http://localhost:5000/Edit/${id}`, {
        petname,
        pethealth,
        petgender,
        petsize,
        petage,
        petlikings,
        aboutpet,
        breed
      });
  
    if(response.data && response.data == 'update successfull') {
      navigateto(`/SingleDetail/${id}`)

      setTimeout(()=>{
        window.alert("Update successful");
      }, 300);
      
     
    }else{
      window.alert("update failed")
    }
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };
  
  
  return (
    <div>
      <InnerNav />
      <div className='m-edit'>
        <div className='W-Addpet'>
          <div className='pet_form'>
            <form  onSubmit={handleSubmit}>
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
                    <div className='l-1'>
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
                      <label htmlFor="breed">Breed:</label><br />
                      <input type="text" placeholder='Your pet Breed ?' id="breed" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />
                    </div>
                  </div>
              
                <div className='right_form'>
                  <div className='l-1'>
                    <label htmlFor="petLikings">Pet Likings:</label><br />
                    <textarea id="petLikings" placeholder="Behaviour and liking of your pet" name="petLikings" rows="6" cols="80" value={petlikings} onChange={(e) => setPetLikings(e.target.value)} required maxLength="500"></textarea>
                  </div>
                  <div className='l-1'>
                    <label htmlFor="aboutPet">About pet:</label><br />
                    <textarea id="aboutPet" placeholder="Write About Your pet..." name="aboutPet" rows="6" cols="80" value={aboutpet} onChange={(e) => setAboutPet(e.target.value)} required ></textarea>
                  </div>
                  <div className='l-2'>
                    <label htmlFor="petPhoto">Pet Photo:</label><br />
                    <input type="file" id="petPhoto" name="petphoto"   />
                  </div>
                </div>
              </div>
              <button className='button3' type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
