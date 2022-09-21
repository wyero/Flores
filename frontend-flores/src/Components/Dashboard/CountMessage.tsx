import React, {useEffect} from 'react'
import {BiMessage} from 'react-icons/bi'
import { useState } from 'react'
import axios from 'axios'

const CountMessage = () => {
  const [countMessage, setCountMessage] = useState([])
  
  useEffect(() => {
    getCountMessage()
  },[])

  const getCountMessage = async () => {
    const response = await axios.get('http://localhost:8000/count-message')
    setCountMessage(response.data)
  }
  return (
    <div className='dashboard'>
      <div className="right-dashboard">
        <section>
          <main>
            <div className="dashboard-main">
                {countMessage.map((countMessage: any) => (
                  <div id="dashboard" key={countMessage.data}>
                    <div className="content">
                      <p>{countMessage.data}</p>
                      <p>Pesan</p>
                    </div>
                    <div className="icon">
                      <BiMessage/>
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

export default CountMessage