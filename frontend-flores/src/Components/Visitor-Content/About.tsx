import React from 'react'
import VideoFlores from '../../Asset/Video/VideoFlores.mp4'

const About = () => {
  return (
    <div className='content-about'>
      <p>Tentang Flores</p>
      <section>
        <div className="video-about-flores">
          <video src={VideoFlores} loop autoPlay muted></video>
        </div>
        <div className="content-about-flores">
          <p>
            Flores adalah sebuah pulau yang terletak di Provinsi Nusa Tenggara Timur, Indonesia. 
            Nama asli dari Pulau Flores adalah Nusa Nipa (Pulau Ular) yang dari sudut pandang Antropologi
            mengandung berbagai makna filosofis, kultural, dan tradisi ritual masyarakat Flores.
            Kata Flores berasal dari bahasa Portugis yaitu "cabo de flores" yang berarti "Tanjung Bunga".
            Flores termasuk dalam gugusan kepulauan Sunda Kecil bersama Bali dan NTB.
          </p>
        </div>
      </section>
    </div>
  )
}

export default About