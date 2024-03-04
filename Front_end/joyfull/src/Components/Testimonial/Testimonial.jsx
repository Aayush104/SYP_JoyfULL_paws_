
import './Testimonial.css'
import profile1 from '../../img/profile1.jpg'
import profile2 from '../../img/profile2.png'
import {Swiper, SwiperSlide} from 'swiper/react';

import { Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const Testimonial = () => {
    const clients = [
        {
          img : profile1,
          Name: "Binod Lama Tamang",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile2,
          Name: "Phiroj Syangden",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile1,
          Name: "Nirakar yakhtumba",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile2,
          Name: "Swapnil Sharma",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile1,
          Name: "Hari Maharjan",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile2,
          Name: "Nikhil Tuladhar",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile1,
          Name: "Awiskar Nepal",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile2,
          Name: "Binod Lama Tamang",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile1,
          Name: "Rohit Shakya",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        {
          img : profile2,
          Name: "Arun pariyar",
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit  dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          
        },
        
        
        ];
        
        
        
        
        
          return (
        
        
            <div className='fix2' id='Testimonial'>
            <h2 className='Heading'>Testimonial</h2>
        
            <div className='t-wrapper'> 
        <Swiper
               modules={[ Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={3}
            
              autoplay ={{ delay: 3000,
              disableOnInteraction: true}}
              pagination={{ clickable: true }}
           
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              >
        
        
        {clients.map((client, index) => (
            <SwiperSlide key={index}>
            <div className='testimonial'>
                    <img src={client.img} alt={`Client ${index}`} />
                    <span>{client.Name}</span>
                    <p>{client.review}</p>
                    </div>
        
            </SwiperSlide>
        
          ))}
        
            
        
        
        
        </Swiper>
        </div>
        
        
              
            </div>
          )
        }
        

export default Testimonial
