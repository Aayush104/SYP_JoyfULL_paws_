import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Detail = () => {

  const {id} = useParams();

  const [detail,setDetail] = useState(null)

  useEffect(()=>{

    const fetchData = async ()=>{

      try {
        const response = await axios.get(`http://localhost:5000/Detail/${id}`);
      setDetail(response.data)
      } catch (error) {
        console.log(error);
      }
      

    }

    fetchData();
  }, [id])
  return (
    <div>
     {detail && detail[0] && (
      <p>{detail[0].PetName}</p>
     )}
    </div>
  )
}

export default Detail
