import React from 'react'

import { Button } from 'antd'

const Hero = () => {
  return (
    <section id='hero'>
      <div id='backgroundVideo' className='bg-video'>
        <div className='overlay'></div>
        <video id='player' loop autoPlay playsInline muted>
          <source id='mp4' src='video/LarrysElectric.mp4' type='video/mp4' />
          <source id='ogg' src='video/LarrysElectric.ogg' type='video/ogg' />
          <source id='webm' src='video/LarrysElectric.webm' type='video/webm' />
        </video>
      </div>
      <div className='center'>
        <img src='img/larrys-logo.svg' alt='Larrys Electric & Heating' />
        <p>Proudly serving the Mini-Cassia area since 1968</p>
        <Button ghost size='large' href='#contact'>
          Contact Us Today!
        </Button>
      </div>
    </section>
  )
}

export default Hero
