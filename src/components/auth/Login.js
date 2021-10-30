import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { login } from '../../actions/users'

import { Layout, Col, Card, Form, Input, Button, message } from 'antd'

const { Content } = Layout

const Login = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleOnFinish = async (values) => {
    try {
      setLoading(true)
      await login(values.email, values.password)
      history.push('/dashboard')
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
          <Card
            title={
              <>
                <img
                  src='img/larrys-logo.svg'
                  alt='Larrys Electric & Heating'
                />
                <h2>Log In</h2>
              </>
            }
          >
            <Form
              name='login'
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
              <Form.Item
                label='Password'
                type='password'
                name='password'
                rules={[{ required: true, message: 'Password is required.' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={loading}>
                  Log In
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Link to='/forgot-password' disabled={loading}>
                  Forgot Password
                </Link>{' '}
                |{' '}
                <Link to='/' disabled={loading}>
                  Return Home
                </Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Content>
    </Layout>
  )
}

export default Login
