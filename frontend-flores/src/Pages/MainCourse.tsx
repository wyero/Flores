import React from 'react'
import { Navigation, Home, About, Travel, Gallery, Contact, Footer } from '../Components';

const MainCourse = () => {
  return (
    <div>
      <div className="home" id='beranda'>
        <Navigation/>
        <Home/>
      </div>
      <div className="about" id='tentang'>
        <About/>
      </div>
      <div className="travel" id='wisata'>
        <Travel/>
      </div>
      <div className="gallery" id='galeri'>
        <Gallery/>
      </div>
      <div className="contact" id='kontak'>
        <Contact/>
      </div>
      <div className="footer">
        <Footer/>
      </div>
    </div>
  )
}

export default MainCourse