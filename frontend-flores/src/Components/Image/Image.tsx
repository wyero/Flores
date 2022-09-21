import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'
import {CgMathPlus} from 'react-icons/cg'
import { TabTitle } from '../../Utils/Title'

const Image = () => {
    TabTitle('Gambar Tempat Wisata Pulau Flores')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state: any) => state.auth)
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(true)

    useEffect(()=>{
        getImages()
    },[])
    
    const getImages = async () => {
        const response = await axios.get('http://localhost:8000/images')
        setImages(response.data)
    }

    const deleteImage = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/images/${id}`)
            getImages()
        } catch (error) {
            console.log(error)
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
        <div className='admin-travel'>
            {open && <Sidebar/>}
            <div className="right-travel">
                <nav>
                    <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
                    <h1>Gambar</h1>
                </nav>
                <section>
                   <main>
                        <Link to='/tambah-gambar' className='link gg'>
                            <CgMathPlus className='icon'/>
                            Tambah Gambar
                        </Link>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Gambar</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {images.map((image: any, index) => (
                                        <tr key={image.id}>
                                            <td>{index+1}</td>
                                            <td><img src={image.url} alt="gambar" /></td>
                                            <td>
                                                <button className='link btn' onClick={()=>deleteImage(image.id)}>Hapus</button>
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

export default Image