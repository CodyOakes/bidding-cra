import React from 'react'

import { Col, Row, Carousel } from 'antd'

const About = () => {
  const contentStyle = {
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#000',
    width: '100%',
  }
  return (
    <section id='about'>
      <div className='container'>
        <h2>Who We Are</h2>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={24}>
            <img
              className='main-about-img'
              src='img/larryselectricowners.png'
              alt='Larrys Electric Shop'
            />
          </Col>
          <Col lg={12} md={24}>
            <p>
              Larry's Electric & Heating Inc, has been creating "Total Comfort
              Systems" since 1968! We proudly serve the Mini-Cassia county area
              and love the people here! We pride ourselves on good honest hard
              work and creating optimal heating and air conditioning systems
              that are custom to each home and business. Our service technicians
              are also available to help you tune up and or repair your existing
              systems.
            </p>
            <p>
              Give us a call to schedule your free estimate today so we can get
              you back to comfort! We also help local residents and businesses
              with all their electrical needs. Our contractors are all licensed
              and trained to the latest state requirements and code. We are also
              a listed contractor for the Idaho Power Efficiency Program. We are
              happy to come to you or feel free to stop by our location and see
              our showroom showcasing some of the gas fireplaces that we offer
              to install.
            </p>
            <p>Thanks for choosing Larry's Electric & Heating Inc!</p>
          </Col>
          <Col xs={24}>
            <Carousel autoplay dotPosition='bottom' arrow>
              <div>
                <img style={contentStyle} src='img/SlideShow_1.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_2.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_3.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_4.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_5.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_6.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_7.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_8.png' alt='' />
              </div>
              <div>
                <img style={contentStyle} src='img/SlideShow_9.png' alt='' />
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default About
