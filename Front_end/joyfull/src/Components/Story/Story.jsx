import React from "react";
import Floating from "../Floating/Floating";
import story from "../../img/Story.png";

const Story = () => {
    return (
        <div className="s-wrapper fix2" id="Story">
          <h2 className="Heading">Our Story</h2>
          <div>
            <Floating
            
    
              image={story}
              text2="Our Beautiful Journey: Joyful Paws"
              text="Joyful Paws is all about my love for animals and my mission to create a better community. 
                        It all started with my passion for pets. I saw many pets needing homes and many people wanting 
                        a furry friend to brighten their lives.
                      As the founder, I'm a pet lover, a caregiver, and a tech enthusiast, all in one.
                      I decided to create a special place where pets and families can meet. Since the beginning, 
                      I've been dedicated to ensuring every pet finds a happy home."
                        photoOnRight={false}
            ></Floating>
          </div>
        </div>
      );
    };
export default Story
