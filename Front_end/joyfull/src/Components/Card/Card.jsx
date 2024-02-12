import React from 'react'
import './Card.css'

const Card = ({image,Title,Desc}) => {
  return (
     <div className='c-wrapper'>
    <div className='main'>
    <img src={image}></img>
    <div className='description'>
        <span>{Title}</span>
        <span>{Desc}</span>
    </div>
    </div>
    </div>
  )
}

export default Card
