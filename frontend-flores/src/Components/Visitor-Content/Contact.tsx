import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const Contact = () => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [nomorTlpn, setNomorTlpn] = useState('')
  const [pesan, setPesan] = useState('')

  const createMessage = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/message', {
        nama: nama,
        email: email,
        nomortlpn: nomorTlpn,
        pesan: pesan
      })
      setNama('')
      setEmail('')
      setNomorTlpn('')
      setPesan('')
    } catch (error: any) {
      console.log(error)
    }
  }
  const notify = () => toast.success("Pesan Terkirim")
  return (
    <div className='content-contact'>
        <p>Kontak</p>
        <div className="form-contact">
            <form onSubmit={createMessage}>
                <input type="text" placeholder='Nama' value={nama} onChange={(e)=>setNama(e.target.value)}/> <br />
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
                <input type="text" placeholder='Nomor Telepon' value={nomorTlpn} onChange={(e)=>setNomorTlpn(e.target.value)}/> <br />
                <textarea name="" id="" placeholder='Pesan' value={pesan} onChange={(e)=>setPesan(e.target.value)}></textarea>
                <button type='submit' onClick={notify}>Kirim</button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Contact