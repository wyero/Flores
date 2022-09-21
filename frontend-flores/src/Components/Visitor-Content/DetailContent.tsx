import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { TabTitle } from '../../Utils/Title';
import axios from 'axios';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { useParams } from 'react-router-dom';

const DetailContent = () => {
  TabTitle('Detail Tempat Wisata')
  const [nama, setNama] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [deskLengkap, setDeskLengkap] = useState('')
  const [gambar, setGambar] = useState('')
  const [gambar1, setGambar1] = useState('')
  const [gambar2, setGambar2] = useState('')
  const {id} = useParams()

  useEffect(() => {
    const getTravelById = async () => {
      const response = await axios.get(`http://localhost:8000/tours/${id}`)
      setNama(response.data.nama)
      setLokasi(response.data.lokasi)
      setDeskLengkap(response.data.desklengkap)
      setGambar(response.data.url)
      setGambar1(response.data.url1)
      setGambar2(response.data.url2)
    }
    getTravelById()
  }, [id])
  
  return (
    <div className='detail-content'>
      <div>
        <div className="main-detail">
        <Swiper className='swiper'
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          loop={true}
        >
          <SwiperSlide>
            <div className="image">
              <img src={gambar} alt="gambar" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image">
              <img src={gambar1} alt="gambar" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image">
              <img src={gambar2} alt="gambar" />
            </div>
          </SwiperSlide>
        </Swiper>
          <div className="cnt">
            <p>{nama}</p>
            <p className='cnt1'>Lokasi : {lokasi}</p>
            <p className='cnt2'>Detail</p>
            <p className='cnt3'>{deskLengkap}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailContent