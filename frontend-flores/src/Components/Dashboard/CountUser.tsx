import React, {useEffect} from 'react'
import {FaUsers} from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'

const CountUser = () => {
  const [CountUser, setCountUser] = useState([])
  
  useEffect(() => {
    getCountUser()
  },[])

  const getCountUser = async () => {
    const response = await axios.get('http://localhost:8000/count-user')
    setCountUser(response.data)
  }
  return (
    <div className='dashboard'>
      <div className="right-dashboard">
        <section>
          <main>
            <div className="dashboard-main">
                {CountUser.map((CountUser: any) => (
                  <div id="dashboard" key={CountUser.data}>
                    <div className="content">
                      <p>{CountUser.data}</p>
                      <p>Admin</p>
                    </div>
                    <div className="icon">
                        <FaUsers/>
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

export default CountUser