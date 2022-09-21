import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { ExternalLink } from 'react-external-link'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { AiTwotonePhone } from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'

const Footer = () => {
  return (
    <div className="content-footer">
        <footer>
            <div className="main-footer">
                <Link to='#beranda' className='link-logo'><h1 className='logo-flores'>FLORES</h1></Link>
                <p>Flores adalah sebuah pulau yang terletak di Provinsi Nusa Tenggara Timur, Indonesia</p>
                <div className="icon-medsos">
                    <ExternalLink href='https://www.facebook.com/wiero.wiero.3/' className='link-medsos fb'><FaFacebookF className='medsos'/></ExternalLink>
                    <ExternalLink href='https://www.instagram.com/jrwyero_619/' className='link-medsos ig'><FaInstagram className='medsos'/></ExternalLink>
                </div>
            </div>
            <div className="main-footer mf2">
                <p className='p2'>Jelajahi</p>
                <Link to='#beranda' className='link'>Beranda</Link>
                <Link to='#tentang' className='link'>Tentang</Link>
                <Link to='#wisata' className='link'>Wisata</Link>
                <Link to='#galeri' className='link'>Galeri</Link>
                <Link to='#kontak' className='link'>Kontak</Link>
            </div>
            <div className="main-footer mf3">
                <p className='p2 p3'>Kontak</p>
                <div className="contact">
                    <AiTwotonePhone className='cp'/>
                    <p className='contact1'>081-239-200-779</p>
                </div>
                <div className="contact">
                    <MdEmail className='cp'/>
                    <p className='contact1'>kajuwyero@gmail.com</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer