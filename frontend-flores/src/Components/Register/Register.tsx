import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TabTitle } from '../../Utils/Title'

const Register = () => {
    TabTitle('Pariwisata Pulau Flores: Register-Admin')
    const [nama, setNama] = useState('')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ulangiPassword, setUlangiPassword] = useState('')
    const [role, setRole] = useState('')
    const [msg, setMsg] = useState('')

    const registerAdmin = async (e: any) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/register-admin', {
                nama: nama,
                email: email,
                password: password,
                ulangiPassword: ulangiPassword,
                role: role
            })
            navigate('/login')
        } catch (error: any) {
            setMsg(error.response.data.msg)
        }
    }
  return (
    <div className='register'>
        <div className="left-register"></div>
        <div className="right-register">
            <h1>Register</h1>
            <form onSubmit={registerAdmin}>
                <p className='error'>{msg}</p>
                <div className="form-register">
                    <input type="text" placeholder='Nama' value={nama} onChange={(e)=>setNama(e.target.value)}/>
                </div>
                <div className="form-register">
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-register">
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-register">
                    <input type="password" placeholder='Ulangi Password' value={ulangiPassword} onChange={(e)=>setUlangiPassword(e.target.value)}/>
                </div>
                <div className="form-register">
                    <select name="" id="" value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value=""></option>
                        <option value="Admin Utama">Admin Utama</option>
                    </select>
                </div>
                <div className="form-register">
                    <button type='submit'>Daftar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register