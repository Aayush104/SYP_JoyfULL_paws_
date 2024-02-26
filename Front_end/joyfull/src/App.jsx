import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Intro from './Components/Intro/Intro';
import Mission from './Components/Mission/Mission';
import About from './Components/About/About';
import Story from './Components/Story/Story';
import Banner from './Components/Banner/Banner';
import Testimonial from './Components/Testimonial/Testimonial';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register';
import Main from './Components/Main/Main';
import './App.css';
import Login from './Components/Login/Login';
import InnerAbout from './Components/InnerAbout/InnerAbout';
import InnerContact from './Components/InnerContact/InnerContact';
import Protect from './Components/Protect/Protect';
import Addpet from './Components/AddPet/Addpet';
import Detail from './Components/Detail/Detail';
import Mypost from './Components/Mypost/Mypost';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            index
            element={
              <>
                <Navbar />
                <Intro />
                <About />
                <Story />
                <Mission />
                <Banner />
                <Testimonial />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Protect><Main /></Protect>} />
          <Route path="/innerAbout" element={<Protect><InnerAbout /></Protect>} />
          <Route path="/innercontact" element={<Protect><InnerContact /></Protect>} />
          <Route path="/Addpet" element={<Protect><Addpet /></Protect>} />
          <Route path="/Detail/:id" element={<Protect><Detail /></Protect>} />
          <Route path="/Mypost" element={<Protect><Mypost /></Protect>} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
