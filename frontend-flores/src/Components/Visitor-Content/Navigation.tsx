import React from 'react'
import MobileNavigation from './MobileNavigation'
import {HashLink as Link} from 'react-router-hash-link'

const Navigation = () => {
  return (
    <>
      <nav className='nav'>
          <Link to='#beranda' className='link'><h1 className='logo-flores'>FLORES</h1></Link>
          <ul>
              <li><Link to='#beranda' className='link'>Beranda</Link></li>
              <li><Link to='#tentang' className='link'>Tentang</Link></li>
              <li><Link to='#wisata' className='link'>Wisata</Link></li>
              <li><Link to='#galeri' className='link'>Galeri</Link></li>
              <li><Link to='#kontak' className='link'>Kontak</Link></li>
          </ul>
      </nav>
      <MobileNavigation/>
    </>
  )
}

export default Navigation