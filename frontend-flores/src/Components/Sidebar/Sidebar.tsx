import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsImages} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {BiMessage} from 'react-icons/bi'
import {FaMapMarked, FaUsers} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, reset } from '../../Features/authSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state: any) => state.auth)
    const logout = () => {
        dispatch(Logout() as any)
        dispatch(reset())
        navigate('/login')
    }
  return (
    <div className='sidebar'>
        <div className="logo-flores">
            <Link to='/halaman-utama' className='link'>flores</Link>
        </div>
        <aside>
            <div className="sidebar-menu">
                <Link to='/halaman-utama' className='link'>
                    <AiFillHome className='icon'/>
                    Halaman <span>Utama</span>
                </Link>
            </div>
            <div className="sidebar-menu">
                <Link to='/tempat-wisata' className='link'>
                    <FaMapMarked className='icon'/>
                    Wisata
                </Link>
            </div>
            <div className="sidebar-menu">
                <Link to='/gambar' className='link'>
                    <BsImages className='icon'/>
                    Gambar
                </Link>
            </div>
            <div className="sidebar-menu">
                <Link to='/pesan' className='link'>
                    <BiMessage className='icon'/>
                    Pesan
                </Link>
            </div>
            {user && user.role === "Admin Utama" && (
                <div className="sidebar-menu">
                    <Link to='/admin' className='link'>
                        <FaUsers className='icon'/>
                        Admin
                    </Link>
                </div>
            )}
            <div className="sidebar-menu">
                <button className='link' id='btn' onClick={logout}><FiLogOut className='icon'/> Keluar</button>
            </div>
        </aside>
    </div>
  )
}

export default Sidebar