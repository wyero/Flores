import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {CgMathPlus} from 'react-icons/cg'
import { TabTitle } from '../../Utils/Title'

const Admin = () => {
    TabTitle('Admin Pariwisata Pulau Flores')
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state: any) => state.auth)
    const [open, setOpen] = useState(true)

    useEffect(() => {
      dispatch(Me() as any)
    }, [dispatch])
  
    useEffect(() => {
      if(isError){
        navigate('/login')
      }
    }, [isError, navigate])
    useEffect(()=>{
        getUser()
    }, [])

    const getUser = async () => {
        const response = await axios.get('http://localhost:8000/users')
        setUsers(response.data)
    }
    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/users/${id}`)
            getUser()
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
                    <h1>Admin</h1>
                </nav>
                <section>
                    <main>
                        <Link to='/admin-baru' className='link'>
                            <CgMathPlus className='icon'/>
                            Admin Baru
                        </Link>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='th1'>No</th>
                                        <th>Nama</th>
                                        <th>Alamat Email</th>
                                        <th>Role</th>
                                        <th className='th2'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any, index) => (
                                        <tr key={user.id}>
                                            <td>{index+1}</td>
                                            <td>{user.nama}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <Link to={`/edit-admin/${user.id}`} className='link'>Edit</Link>
                                                <button className='link btn' onClick={()=>deleteUser(user.id)}>Hapus</button>
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

export default Admin