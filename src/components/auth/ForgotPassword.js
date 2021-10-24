import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { resetPassword } from '../../actions/users'

import { Layout, Col, Card, Form, Input, Button, message } from 'antd'
const { Content } = Layout

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const handleOnFinish = async (values) => {
    try {
      setLoading(true)
      await resetPassword(values.email)
      message.success(`Check your email inbox for further instructions.`)
      setLoading(false)
    } catch (error) {
      console.error(error)
      message.error(`${error.code}: ${error.message}`)
      setLoading(false)
    }
  }
  return (
    <Layout>
      <Content style={{ height: '100vh', marginTop: '5vh' }}>
        <Col md={{ span: 8, offset: 8 }}>
          <Card title={<h2>Password Reset</h2>}>
            <Form
              name='ForgotPassword'
              onFinish={handleOnFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete='off'
            >
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Email is required.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={loading}>
                  Reset Password
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Link to='/login' disabled={loading}>
                  Log In
                </Link>{' '}
                |{' '}
                <Link to='/' disabled={loading}>
                  Back to larryselectric.com
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Content>
    </Layout>
  )
}

export default ForgotPassword
