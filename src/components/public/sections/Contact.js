import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import ReCAPTCHA from 'react-google-recaptcha'

import { Form, Input, Button, message, Row, Col } from 'antd'
const { TextArea } = Input

const Contact = () => {
  const defaultFormData = {
    email: '',
    name: '',
    subject: '',
    message: '',
    'g-recaptcha-response': '',
  }

  const [formData, setFormData] = useState(defaultFormData)

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleRecaptchaChange = (value) => {
    setFormData({ ...formData, 'g-recaptcha-response': value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    emailjs
      .send(
        'service_4v9yfx8',
        'template_gev2jy4',
        formData,
        'user_IqWbkx5I7d6CplrzmpZni'
      )
      .then(
        (result) => {
          message.success('Your message has been sent, thanks!', result.text)
          setFormData(defaultFormData)
        },
        (error) => {
          message.error('Sorry! Feedback error: ', error.text)
        }
      )
  }
  return (
    <section id='contact'>
      <div className='container'>
        <h2>Contact Us Today!</h2>
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <h4>Stop By</h4>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2939.7742670611547!2d-113.79377408430315!3d42.53884963178396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54ab367144d5b7c1%3A0xb7fb1b6f5984704b!2sLarry&#39;s%20Electric%20%26%20Heating%20Inc!5e0!3m2!1sen!2sus!4v1571093624992!5m2!1sen!2sus'
              width='600'
              height='450'
              frameBorder='0'
              allowFullScreen=''
              title='Larrys Electric'
            ></iframe>
          </Col>
          <Col md={12} xs={24}>
            <h4>Give Us A Call</h4>
            <p className='phone-number'>
              <a className='phone' href='tel:+1-208-678-4071'>
                208-678-4071 (Tap To Call)
              </a>
            </p>
            <h4>Send Us A Message</h4>
            <Form onFinish={handleSubmit}>
              <Form.Item
                name='email'
                type='email'
                onChange={(e) => handleFormChange(e)}
                required
              >
                <Input placeholder='Your Email Address' />
              </Form.Item>
              <Form.Item
                name='name'
                type='text'
                onChange={(e) => handleFormChange(e)}
                required
              >
                <Input placeholder='Your Name' />
              </Form.Item>
              <Form.Item
                name='subject'
                type='text'
                onChange={(e) => handleFormChange(e)}
                required
              >
                <Input placeholder='Subject of Message' />
              </Form.Item>
              <Form.Item
                name='message'
                as='textarea'
                onChange={(e) => handleFormChange(e)}
                required
              >
                <TextArea placeholder='Your Message' autoSize />
              </Form.Item>
              <ReCAPTCHA
                sitekey='6Lfn6ZEaAAAAAMqyyQoPUFydPxKhyjc_XOdAf-rW'
                onChange={handleRecaptchaChange}
              />
              <Button variant='outline-secondary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Contact
