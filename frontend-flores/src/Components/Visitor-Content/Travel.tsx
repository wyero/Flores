import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Travel = () => {
  const [travels, setTravel] = useState([])
  useEffect(() => {
    getTravel()
  }, [])
  const getTravel = async () => {
    const response = await axios.get('http://localhost:8000/tours')
    setTravel(response.data)
  }
  return (
    <div className='content-travel'>
      <p className='tw'>Tempat Wisata</p>
      <div className="main-travel-content">
        {travels.map((travel: any) => (
          <div key={travel.id}>
            <div className="img">
              <img src={travel.url} alt="gambar"/>
            </div>
            <div className="content">
              <p>{travel.nama}</p>
              <p className='content1'>{travel.desksingkat}</p>
              <p>Rp. {travel.harga}</p>
              <div className="active">
                <Link to={`/detail-tempat-wisata/${travel.id}`} target='_blank' className='detail'>Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Travel