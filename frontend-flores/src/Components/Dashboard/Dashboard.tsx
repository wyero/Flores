import React, {useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../Features/authSlice'
import CountImage from './CountImage'
import CountTour from './CountTour'
import CountMessage from './CountMessage'
import CountUser from './CountUser'
import { TabTitle } from '../../Utils/Title'

const Dashboard = () => {
  TabTitle('Halaman Utama')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError, user} = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    dispatch(Me() as any)
  }, [dispatch])

  useEffect(() => {
    if(isError){
      navigate('/login')
    }
  }, [isError, navigate])

  return (
    <div className='dashboard'>
        {open && <Sidebar/>}
      <div className="right-dashboard">
        <nav>
          <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
          <h1>Halaman Utama</h1>
        </nav>
        <section>
          <p>Selamat Datang <strong>{user && user.nama}</strong></p>
          <main>
            <div className="dashboard-main">
              <CountTour/>
              <CountImage/>
              <CountMessage/>
              {user && user.role === "Admin Utama" && (
                <CountUser/>
              )}
            </div>
          </main>
        </section>
      </div>
    </div>
  )
}

export default Dashboard