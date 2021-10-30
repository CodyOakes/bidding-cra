import React from 'react'

import { FaBolt, FaFire, FaSnowflake } from 'react-icons/fa'

import { Card, Row, Col } from 'antd'

const Services = () => {
  return (
    <section id='services'>
      <div className='container'>
        <h2>
          We Do
          <div className='rw-words'>
            <span>Installs.</span>
            <span>Services.</span>
            <span>Repairs.</span>
            <span>Residential.</span>
            <span>Industrial.</span>
            <span>Commercial.</span>
          </div>
        </h2>
        <Row justify='center' gutter={[16, 16]}>
          <Col md={8} xs={24}>
            <Card
              title={
                <>
                  <FaBolt className='fas fa-bolt' />
                  <h4>Electric</h4>
                </>
              }
            >
              <ul>
                <li>New Construction</li>
                <li>Remodels</li>
                <li>Service</li>
              </ul>
            </Card>
          </Col>
          <Col md={8} xs={24}>
            <Card
              title={
                <>
                  <FaFire className='fas fa-fire' />
                  <h4>Heating</h4>
                </>
              }
            >
              <ul>
                <li>Furnaces</li>
                <li>Inserts</li>
                <li>Fireplaces</li>
              </ul>
            </Card>
          </Col>
          <Col md={8} xs={24}>
            <Card
              title={
                <>
                  <FaSnowflake className='fas fa-snowflake' />
                  <h4>Air Conditioning</h4>
                </>
              }
            >
              <ul>
                <li>Central Air</li>
                <li>HVAC</li>
                <li>Duct Work</li>
              </ul>
            </Card>
          </Col>
        </Row>
        <div className='brands'>
          <h2>Choose from Leading Brands</h2>
          <Row justify='center' gutter={[16, 16]}>
            <Col md={8} xs={24}>
              <a
                href='https://napoleonfireplaces.com/'
                target='_blank'
                rel='noreferrer'
              >
                <Card border='warning'>
                  <img src='img/napoleon-logo.png' alt='Napoleon' />
                </Card>
              </a>
            </Col>
            <Col md={8} xs={24}>
              <a href='https://www.trane.com/' target='_blank' rel='noreferrer'>
                <Card border='danger'>
                  <img src='img/trane-logo.png' alt='Trane' />
                </Card>
              </a>
            </Col>
            <Col md={8} xs={24}>
              <a
                href='https://www.amana.com/heating-ac.html'
                target='_blank'
                rel='noreferrer'
              >
                <Card border='primary'>
                  <img src='img/amana-logo.png' alt='Amana' />
                </Card>
              </a>
            </Col>
            <Col md={8} xs={24}>
              <a
                href='https://www.mitsubishicomfort.com/'
                target='_blank'
                rel='noreferrer'
              >
                <Card border='danger'>
                  <img src='img/mitsubishi-logo.png' alt='Mitsubishi' />
                </Card>
              </a>
            </Col>
            <Col md={8} xs={24}>
              <a
                href='https://daikincomfort.com/products/heating-cooling'
                target='_blank'
                rel='noreferrer'
              >
                <Card border='primary'>
                  <img src='img/daikin-logo.png' alt='Daikin' />
                </Card>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  )
}

export default Services
