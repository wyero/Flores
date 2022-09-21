import React, { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { CgMenu, CgClose } from 'react-icons/cg'

const MobileNavigation = () => {
    const [open, setOpen] = useState(false)
    const hamburgerOpen = <CgMenu className='hamburger-menu' onClick={()=>setOpen(!open)}/>
    const hamburgerClose = <CgClose className='hamburger-menu close' onClick={()=>setOpen(!open)}/>
  return (
    <nav className='mobile-navigation'>
        {open ? hamburgerClose : hamburgerOpen}
        {open && <ul>
            <li><Link to='#beranda' className='link'>Beranda</Link></li>
            <li><Link to='#tentang' className='link'>Tentang</Link></li>
            <li><Link to='#wisata' className='link'>Wisata</Link></li>
            <li><Link to='#galeri' className='link'>Galeri</Link></li>
            <li><Link to='#kontak' className='link'>Kontak</Link></li>
        </ul>}
    </nav>
  )
}

export default MobileNavigation