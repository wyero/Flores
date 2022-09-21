import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {CgMathPlus} from 'react-icons/cg'
import { TabTitle } from '../../Utils/Title'

const AdminTravel = () => {
    TabTitle('Wisata Pulau Flores')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tours, setTours] = useState([])
    const [open, setOpen] = useState(true)
    const {isError} = useSelector((state: any) => state.auth)
  
    useEffect(() => {
      dispatch(Me() as any)
    }, [dispatch])
  
    useEffect(() => {
      if(isError){
        navigate('/login')
      }
    }, [isError, navigate])

    useEffect(() => {
        getTours()
    }, [])
    
    const getTours = async () => {
        const response = await axios.get('http://localhost:8000/tours')
        setTours(response.data)
    }
    const deleteTours = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/tours/${id}`)
            getTours()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='admin-travel'>
            {open && <Sidebar/>}
            <div className="right-travel">
                <nav>
                    <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
                    <h1>Wisata</h1>
                </nav>
                <section>
                    <main>
                        <Link to='/wisata-baru' className='link'>
                            <CgMathPlus className='icon'/>
                            Wisata Baru
                        </Link>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Lokasi</th>
                                        <th>Biaya Masuk</th>
                                        <th>Deskripsi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tours.map((tour: any, index) => (
                                        <tr key={tour.id}>
                                            <td>{index+1}</td>
                                            <td>{tour.nama}</td>
                                            <td>{tour.lokasi}</td>
                                            <td>{tour.harga}</td>
                                            <td>{tour.desksingkat}</td>
                                            <td>
                                                <Link to={`/edit-tempat-wisata/${tour.id}`} className='link'>Edit</Link>
                                                <button className='link btn' onClick={()=>deleteTours(tour.id)}>Hapus</button>
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

export default AdminTravel