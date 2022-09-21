import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Me } from '../../Features/authSlice'
import Sidebar from '../Sidebar/Sidebar'
import {FiMenu} from 'react-icons/fi'

const NewImage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError} = useSelector((state: any) => state.auth)
  const [open, setOpen] = useState(true)
  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')
  const [msg, setMsg] = useState('')

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

  const saveImage = async (e: any) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append("file", file)
      try {
        await axios.post('http://localhost:8000/images', formData, {
          headers: {
            "content-type":"multipart/form-data"
          }
        })
        navigate('/gambar')
      } catch (error: any) {
        setMsg(error.response.data.msg)
      }
  }
  return (
    <div className='new-tour'>
        {open && <Sidebar/>}
      <div className="right-tour">
        <nav>
          <FiMenu className='menu' onClick={()=>setOpen(!open)}/>
          <h1>Gambar</h1>
        </nav>
        <section>
          <main>
            <h1>Tambah Gambar</h1>
            <form className='form' onSubmit={saveImage}>
              <p className='error'>{msg}</p>
              <div className="form-input">
                  <label htmlFor="gambar1">Gambar</label><br />
                  <input type="file" id='gambar1' onChange={loadImage}/>
              </div>
              {preview ? (
                <figure>
                  <img src={preview} alt="preview-image" />
                </figure>
              ) : (
                ""
              )}
              <button className='btn btn1' type='submit'>Simpan</button>
            </form>
          </main>
        </section>
      </div>
    </div>
  )
}

export default NewImage