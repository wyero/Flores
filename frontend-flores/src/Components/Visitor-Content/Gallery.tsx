import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Gallery = () => {
    const [images, setImages] = useState([])
    useEffect(()=>{
        getImages()
    },[])
    
    const getImages = async () => {
        const response = await axios.get('http://localhost:8000/images')
        setImages(response.data)
    }
  return (
    <div className='content-gallery'>
        <p>Galeri</p>
        <div className="main-gallery" >
            {images.map((image: any)=>(
                <div className="img" key={image.id}>
                    <img src={image.url} alt="gambar" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Gallery