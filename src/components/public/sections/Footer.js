import React from 'react'

import { format } from 'date-fns'

import { Row, Col } from 'antd'

import { FaFacebook, FaYelp, FaGoogle } from 'react-icons/fa'

const Footer = () => {
  return (
    <div id='footer' className='p-5'>
      <div className='container'>
        <Row justify='center'>
          <Col sm={8}>
            <p>&copy; {format(new Date(), 'yyyy')}</p>
            <p>
              <img
                className='footer-logo'
                src='img/larrys-logo.svg'
                alt="Larry's Electric & Heating"
              />
            </p>
          </Col>
          <Col sm={8}>
            <Row justify='center'>
              <Col>
                <p>Connect with us!</p>
              </Col>
            </Row>
            <Row justify='center' gutter={[16, 16]}>
              <Col>
                <a
                  href='https://www.facebook.com/tim122571/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaFacebook className='fab fa-facebook' />
                </a>
              </Col>
              <Col>
                <a
                  href='https://www.yelp.com/biz/larrys-electric-and-heating-burley-2'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaYelp className='fab fa-yelp' />
                </a>
              </Col>
              <Col>
                <a
                  href='https://www.google.com/search?q=larry%27s+electric&oq=larry%27s+e&aqs=chrome.1.69i57j35i39j0j69i60l3.9638j0j4&sourceid=chrome&ie=UTF-8#lrd=0x54ab367144d5b7c1:0xb7fb1b6f5984704b,1,,,'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FaGoogle className='fab fa-google' />
                </a>
              </Col>
            </Row>
          </Col>
          <Col sm={8}>
            <p>Site Created By</p>
            <a
              href='http://www.oakessolutions.com'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='img/oakessolutions-logo.png'
                alt='Oakes Solutions'
                width='150px'
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Footer
