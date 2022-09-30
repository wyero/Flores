import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailContent from '../Components/Visitor-Content/DetailContent'
import MainCourse from '../Pages/MainCourse'
import { Login, Dashboard, AdminTravel, NewTour, TravelEdit, Image, NewImage, Admin, 
         NewAdmin, AdminEdit, NotFound, Message, Register } from '../Components'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<MainCourse/>}/>
            <Route path='/detail-tempat-wisata/:id' element={<DetailContent/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/halaman-utama' element={<Dashboard/>}/>
            <Route path='/tempat-wisata' element={<AdminTravel/>}/>
            <Route path='/wisata-baru' element={<NewTour/>}/>
            <Route path='/edit-tempat-wisata/:id' element={<TravelEdit/>}/>
            <Route path='/gambar' element={<Image/>}/>
            <Route path='/tambah-gambar' element={<NewImage/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/admin-baru' element={<NewAdmin/>}/>
            <Route path='/edit-admin/:id' element={<AdminEdit/>}/>
            <Route path='/pesan' element={<Message/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </Router>
  )
}

export default Routing