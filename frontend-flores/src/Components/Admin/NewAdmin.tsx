import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'

const NewAdmin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError} = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(true)
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ulangiPassword, setUlangiPassword] = useState('')
  const [role, setRole] = useState('')
  const [msg, setMsg] = useState('')

  const saveAdmin = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/users', {
        nama: nama,
        email: email,
        password: password,
        ulangiPassword: ulangiPassword,
        role: role
      })
      navigate('/admin')
    } catch (error: any) {
      setMsg(error.response.data.msg)
    }
  }
  useEffect(() => {
    dispatch(Me() as any)
  }, [dispatch])

  useEffect(() => {
    if(isError){
      navigate('/login')
    }
  }, [isError, navigate])
  return (
    <div className='new-tour'>
        {open && <Sidebar/>}
      <div className="right-tour">
        <nav>
          <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
          <h1>Admin</h1>
        </nav>
        <section>
          <main>
            <h1>Admin Baru</h1>
            <form className='form' onSubmit={saveAdmin}>
              <p className='error'>{msg}</p>
              <div className="form-input">
                  <label htmlFor="nama">Nama</label><br />
                  <input type="text" id='nama' value={nama} onChange={(e)=>setNama(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="email">Email</label><br />
                  <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="password">Password</label><br />
                  <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="ulangiPassword">Ulangi Password</label><br />
                  <input type="password" id='ulangiPassword' value={ulangiPassword} onChange={(e)=>setUlangiPassword(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="role">Role</label><br />
                  <select id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
                    <option value=""></option>
                    <option value="Admin Utama">Admin utama</option>
                    <option value="Admin">Admin</option>
                  </select>
              </div>
              <button className='btn' type='submit'>Simpan</button>
            </form>
          </main>
        </section>
      </div>
    </div>
  )
}

export default NewAdmin