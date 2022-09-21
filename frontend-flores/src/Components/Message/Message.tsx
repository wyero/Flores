import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'
import { TabTitle } from '../../Utils/Title'

const Message = () => {
    TabTitle('Pesan')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state: any) => state.auth)
    const [open, setOpen] = useState(true)
    const [pesan, setPesan] = useState([])

    useEffect(() => {
      dispatch(Me() as any)
    }, [dispatch])
  
    useEffect(() => {
      if(isError){
        navigate('/login')
      }
    }, [isError, navigate])

    useEffect(() => {
        getMessage()
    }, [])

    const getMessage = async () => {
        const response = await axios.get('http://localhost:8000/message')
        setPesan(response.data)
    }

    const deleteMessage = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/message/${id}`)
            getMessage()
        } catch (error: any) {
            console.log(error)
        }
    }
    
    return (
        <div className='admin-travel'>
            {open && <Sidebar/>}
            <div className="right-travel">
                <nav>
                    <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
                    <h1>Pesan</h1>
                </nav>
                <section>
                   <main>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Tanggal</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>No Telpn</th>
                                        <th className='message'>Pesan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pesan.map((pesan: any, index) => (
                                        <tr key={pesan.id}>
                                            <td>{index+1}</td>
                                            <td>{pesan.tanggal}</td>
                                            <td>{pesan.nama}</td>
                                            <td>{pesan.email}</td>
                                            <td>{pesan.nomortlpn}</td>
                                            <td className='message'>{pesan.pesan}</td>
                                            <td>
                                                <button className='link btn' type='submit' onClick={()=>deleteMessage(pesan.id)}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </section>
            </div>
        </div>
  )
}

export default Message