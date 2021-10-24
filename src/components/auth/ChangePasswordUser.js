import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'

import { useAuth } from '../../contexts/AuthContext'

import { Form, Input, Button, message } from 'antd'

const ChangePasswordUser = () => {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  const history = useHistory()

  const handleOnFinish = async ({ password }) => {
    try {
      setLoading(true)
      await auth.currentUser.updatePassword(password)
      setLoading(false)
      message.success(
        `Success, you have changed the password for ${currentUser.displayName}`
      )
      history.push('/dashboard')
    } catch (error) {
      console.error(error)
      message.error(`${error.message}`)
      setLoading(false)
    }
  }

  return (
    <Form
      name='update-profile'
      layout='vertical'
      onFinish={handleOnFinish}
      autoComplete='off'
    >
      <h2>Change Password for {currentUser.email}</h2>
      <Form.Item
        label='Password'
        type='password'
        name='password'
        rules={[{ required: true, message: 'Password is required.' }]}
      >
        <Input.Password placeholder='leave blank to keep the same' />
      </Form.Item>
      <Form.Item
        label='Confirm Password'
        type='password'
        name='confirmPassword'
        rules={[
          { required: true, message: 'Password is required.' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              )
            },
          }),
        ]}
      >
        <Input.Password placeholder='leave blank to keep the same' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' disabled={loading}>
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        <Link to='/dashboard' disabled={loading}>
          Cancel
        </Link>
      </Form.Item>
    </Form>
  )
}

export default ChangePasswordUser
