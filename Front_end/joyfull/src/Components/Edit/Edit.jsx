import React, { useEffect, useRef, useState } from 'react';
import './Edit.css'

import InnerNav from '../InnerNav/InnerNav';
import Footer from '../Footer/Footer';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxUpload } from "react-icons/rx";
import {toast} from 'react-toastify'

const Edit = () => {
  const { id } = useParams();
  const navigateto = useNavigate();


  const [petData, setPetData] = useState({
    petname: '',
    petgender: '',
    pethealth: '',
    petsize: '',
    petage: '',
    petlikings: '',
    aboutpet: '',
    breed: '',
    petphoto: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }

  useEffect(() => {
    const getPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Edit/${id}`);

        if (response.data && response.data[0]) {
          const petDataFromServer = response.data[0];
          setPetData({
            petname: petDataFromServer.PetName,
            petgender: petDataFromServer.PetGender,
            pethealth: petDataFromServer.Health,
            petsize: petDataFromServer.Petsize,
            petage: petDataFromServer.Age,
            petlikings: petDataFromServer.PetLikings,
            aboutpet: petDataFromServer.AboutPet,
            breed: petDataFromServer.Breed,
       
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getPetData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
      formData.append('petphoto', petData.petphoto);
    formData.append('petname', petData.petname);
    formData.append('pethealth', petData.pethealth);
    formData.append('petgender', petData.petgender);
    formData.append('petsize', petData.petsize);
    formData.append('petage', petData.petage);
    formData.append('petlikings', petData.petlikings);
    formData.append('aboutpet', petData.aboutpet);
    formData.append('breed', petData.breed);
  
    try {
      const response = await axios.post(`http://localhost:5000/Edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data && response.data === 'update successful') {
        navigateto(`/SingleDetail/${id}`);

  
        setTimeout(() => {
          toast.success("Update successful",{
            position: "top-center",



          });
        },200);
      } else {
        toast.error("Update failed",{
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      toast.error("An error Occured",{
        theme: "colored",
      });
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value
    });   
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPetData({
      ...petData,
      petphoto: e.target.files[0]
    });
  };

  return (
    <div>
      <InnerNav />
     
      <div className='m-edit'>
     
      <div className='w-edit'>
      <div className='head_edit'>
        {/* <div className='W-Addpet'> */}
        <h2>Edit Your Pet details</h2>
        </div>
          <div className='pet_form'>
          
            <form onSubmit={handleSubmit}>
              <div className='form_p'>
                <div className='left_form'>
                  <div className='l-1'>
                    <label htmlFor="petName">Pet Name:</label><br />
                    <input type="text" id="petName" name="petname" value={petData.petname} onChange={handleInputChange} placeholder='Enter Your Pet Name' required />
                  </div>
                  <div className='l-1'>
                    <label htmlFor="petGender">Add Pet Gender:</label><br />
                    <select
                      id='petGender'
                      name='petgender'
                      value={petData.petgender}
                      onChange={handleInputChange}
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
                      name='pethealth'
                      value={petData.pethealth}
                      onChange={handleInputChange}
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
                      name='petsize'
                      value={petData.petsize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value='' disabled>Your Pet Size ?</option>
                      <option value='large'>Large</option>
                      <option value='medium'>Medium</option>
                      <option value='small'>Small</option>
                    </select>
                  </div>
                  <div className='l-1'>
                    <label htmlFor="petAge">Age:</label><br />
                    <input type="text" placeholder='Your Pet Age?' id="petAge" name="petage" value={petData.petage} onChange={handleInputChange} required />
                  </div>
                  <div className='l-1'>
                    <label htmlFor="breed">Breed:</label><br />
                    <input type="text" placeholder='Your pet Breed ?' id="breed" name="breed" value={petData.breed} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className='right_form'>
                  <div className='l-1'>
                    <label htmlFor="petLikings">Pet Likings:</label><br />
                    <textarea id="petLikings" placeholder="Behaviour and liking of your pet" name="petlikings" rows="7" cols="70" value={petData.petlikings} onChange={handleInputChange} required ></textarea>
                  </div>
                  <div className='l-1'>
                    <label htmlFor="aboutPet">About pet:</label><br />
                    <textarea id="aboutPet" placeholder="Write About Your pet..." name="aboutpet" rows="14" cols="70" value={petData.aboutpet} onChange={handleInputChange} required ></textarea>
                  </div>
                  <div className='l-2'>
                    <label htmlFor="petPhoto">Pet Photo:</label><br />
                    <div className='photo_div'>
                    <input type="file" id="petPhoto" name="petphoto"   ref={fileInputRef}
                        style={{ display: 'none' }} onChange={handleFileChange} />

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
          <button className='button3' type="submit">Update</button>
          <NavLink to= '/Mypost'>
          <button className='button4'>Back</button>
          </NavLink>
        
          </div>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Edit;
