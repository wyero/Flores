import React, {useEffect} from 'react'
import {FaMapMarked} from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'

const CountTour = () => {
  const [countTour, setCountTour] = useState([])

  useEffect(() => {
    getCountTour()
  },[])

  const getCountTour = async () => {
    const response = await axios.get('http://localhost:8000/count-tour')
    setCountTour(response.data)
  }
  return (
    <div className='dashboard'>
      <div className="right-dashboard">
        <section>
          <main>
            <div className="dashboard-main">
                {countTour.map((countTour: any) => (
                  <div id="dashboard" key={countTour.data}>
                    <div className="content">
                      <p>{countTour.data}</p>
                      <p>Wisata</p>
                    </div>
                    <div className="icon">
                      <FaMapMarked/>
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

export default CountTour