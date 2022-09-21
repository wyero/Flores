import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'

const NewTour = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [desksingkat, setDeskSingkat] = useState('')
  const [desklengkap, setDeskLengkap] = useState('')
  const [file, setFile] = useState('')
  const [file1, setFile1] = useState('')
  const [file2, setFile2] = useState('')
  const [preview, setPreview] = useState('')
  const [preview1, setPreview1] = useState('')
  const [preview2, setPreview2] = useState('')
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
  const loadImage = (e: any) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }
  const loadImage1 = (e: any) => {
    const image1 = e.target.files[0]
    setFile1(image1)
    setPreview1(URL.createObjectURL(image1))
  }
  const loadImage2 = (e: any) => {
    const image2 = e.target.files[0]
    setFile2(image2)
    setPreview2(URL.createObjectURL(image2))
  }

  const saveTour = async (e: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nama", nama)
    formData.append("harga", harga)
    formData.append("lokasi", lokasi)
    formData.append("desksingkat", desksingkat)
    formData.append("desklengkap", desklengkap)
    formData.append("file", file)
    formData.append("file2", file1)
    formData.append("file3", file2)
    try {
      await axios.post('http://localhost:8000/tours', formData, {
        headers: {
          "content-type":"multipart/form-data"
        }
      })
      navigate('/tempat-wisata')
    } catch (error: any) {
      console.log({msg: error.message})
    }
}
  return (
    <div className='new-tour'>
        {open && <Sidebar/>}
      <div className="right-tour">
        <nav>
          <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
          <h1>Wisata</h1>
        </nav>
        <section>
          <main>
            <h1>Wisata Baru</h1>
            <form className='form' onSubmit={saveTour}>
              <div className="form-input">
                  <label htmlFor="wisata">Tempat Wisata</label><br />
                  <input type="text" id='wisata' value={nama} onChange={(e)=>setNama(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="biayaMasuk">Biaya Masuk</label><br />
                  <input type="text" id='biayaMasuk' value={harga} onChange={(e)=>setHarga(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="lokasi">Lokasi</label><br />
                  <input type="text" id='lokasi' value={lokasi} onChange={(e)=>setLokasi(e.target.value)}/>
              </div>
              <div className="form-input">
                  <label htmlFor="deskripsiSingkat">Deskripsi Singkat</label><br />
                  <textarea id="deskripsiSingkat" value={desksingkat} onChange={(e)=>setDeskSingkat(e.target.value)}></textarea>
              </div>
              <div className="form-input">
                  <label htmlFor="deskripsiLengkap">Deskripsi Lengkap</label><br />
                  <textarea id="deskripsiLengkap" className='dskL' value={desklengkap} onChange={(e)=>setDeskLengkap(e.target.value)}></textarea>
              </div>
              <div className="form-input">
                  <label htmlFor="gambar1">Gambar</label><br />
                  <input type="file" id='gambar1' onChange={loadImage}/>
                  {preview ? (
                    <figure>
                      <img src={preview} alt="gambar tempat wisata" />
                    </figure>
                  ) : (
                    ""
                  )}
              </div>
              <div className="form-input">
                  <label htmlFor="gambar2">Gambar 1</label><br />
                  <input type="file" id='gambar2' onChange={loadImage1}/>
                  {preview1 ? (
                    <figure>
                      <img src={preview1} alt="gambar tempat wisata" />
                    </figure>
                  ) : (
                    ""
                  )}
              </div>
              <div className="form-input">
                  <label htmlFor="gambar3">Gambar 2</label><br />
                  <input type="file" id='gambar3' onChange={loadImage2}/>
                  {preview2 ? (
                    <figure>
                      <img src={preview2} alt="gambar tempat wisata" />
                    </figure>
                  ) : (
                    ""
                  )}
              </div>
              <button className='btn' type='submit'>Simpan</button>
            </form>
          </main>
        </section>
      </div>
    </div>
  )
}

export default NewTour