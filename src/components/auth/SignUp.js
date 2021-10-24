import React, { useState } from 'react'

import { createUser } from '../../actions/users'

import { Layout, Col, Card, Form, Input, Button, Alert } from 'antd'
const { Content } = Layout

const SignUp = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnFinish = async (values) => {
    try {
      setError('')
      setLoading(true)
      await createUser(values.email, values.password)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError('Failed to create an account')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Content style={{ height: '100vh', marginTop: '5vh' }}>
        <Col md={{ span: 8, offset: 8 }}>
          <Card title={<h2>Sign Up</h2>}>
            {error && <Alert type='error'>{error}</Alert>}
            <Form
              name='signup'
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
              <Form.Item
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                rules={[
                  { required: true, message: 'Confirm Password is required.' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      )
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={loading}>
                  Submit
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <div>Already have an account? Log In</div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Content>
    </Layout>
  )
}

export default SignUp
