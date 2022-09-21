import React, {useEffect} from 'react'
import {BsImages} from 'react-icons/bs'
import { useState } from 'react'
import axios from 'axios'

const CountImage = () => {
  const [countImage, setCountImage] = useState([])

  useEffect(() => {
    getCountImage()
  },[])

  const getCountImage = async () => {
    const response = await axios.get('http://localhost:8000/count-image')
    setCountImage(response.data)
  }
  return (
    <div className='dashboard'>
      <div className="right-dashboard">
        <section>
          <main>
            <div className="dashboard-main">
                {countImage.map((countImage: any) => (
                    <div id="dashboard" key={countImage.data}>
                        <div className="content">
                            <p>{countImage.data}</p>
                            <p>Gambar</p>
                        </div>
                        <div className="icon">
                            <BsImages/>
                        </div>
                    </div>
                ))}
            </div>
          </main>
        </section>
      </div>
    </div>
  )
}

export default CountImage