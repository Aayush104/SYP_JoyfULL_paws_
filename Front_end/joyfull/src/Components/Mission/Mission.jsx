import React from 'react'
import Floating from "../Floating/Floating";
import Saving from "../../img/Saving.png";
import shelter from "../../img/Shelter.jpg";
import teaming from "../../img/teaming.jpg";

const Mission = () => {
    return (
        <div className="M-wrapper fix2" id="Mission">
          <h2 className="Heading">Our Mission</h2>
    
          <div >
            <Floating
              image={Saving}
              text2='Saving lives'
              text="Our primary mission is to save the lives of animals in need by connecting them with loving homes. We are committed to reducing the number
               of homeless pets through adoption, promoting spaying and neutering, and raising awareness about the importance of responsible pet ownership. 
               Every adoption represents a life saved and a new chapter for an animal in search of a forever family."
               photoOnRight={false}
            ></Floating>
          </div>
          <div >
            <Floating
              image={shelter}
              text2='Standing With Shelters'
              text="We stand in solidarity with animal shelters and rescue facilities. 
              Our website serves as a platform to support their tireless work in rescuing, rehabilitating, and caring for animals.
               We advocate for the humane treatment of all animals and support the invaluable role that shelters play in safeguarding the lives and dignity of our furry friends."
               photoOnRight={true}
            ></Floating>
          </div>
          <div>
            <Floating
              image={teaming}
              text2='Teaming Up'
              text="We believe that the journey to find homes for animals is a collective effort. 
              We work in collaboration with shelters, rescue organizations, volunteers, and pet lovers from all walks of life to ensure that no animal is left behind. 
              Together, we can make a significant impact and improve the well-being of pets in our communities."
              photoOnRight={false}
            ></Floating>
          </div>
        </div>
      );
    };
    

export default Mission
