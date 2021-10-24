import React, { useState } from 'react'
import { useHistory } from 'react-router'
import useAxios from '../../hooks/useAxios'

import { useAuth, authorize } from '../../contexts/AuthContext'

import { patchUser, postUser } from '../../actions/users'

import { allAccessLvls } from '../../config/allAccessLvls'
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Checkbox,
  Spin,
  Select,
  message,
} from 'antd'

const UserDetails = ({ match }) => {
  const { currentUser } = useAuth()

  const history = useHistory()

  let url = null
  let paramId = match.params.id
  if (paramId) {
    url = `/users/${paramId}`
  }
  const [{ data, loading }] = useAxios('get', url, {})

  const [formLoading, setFormLoading] = useState(false)

  const handleOnFinish = async (values) => {
    try {
      setFormLoading(true)
      if (paramId) {
        await patchUser(values, paramId)
      } else {
        await postUser(values)
        history.push(`/users`)
      }
      setFormLoading(false)
    } catch (error) {
      console.error(error)
      message.error('Failed to create an account')
      setFormLoading(false)
    }
  }

  return loading ? (
    <Spin />
  ) : (
    <>
      <Form
        name='signup'
        layout='vertical'
        onFinish={handleOnFinish}
        autoComplete='off'
        initialValues={
          paramId
            ? data
            : {
                email: '',
                password: '',
                confirmPassword: '',
                displayName: '',
                phoneNumber: '+1 208 ',
                disabled: false,
              }
        }
      >
        <h2>{paramId ? `Edit User: ${data.uid}` : 'Add User'}</h2>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Email is required.' }]}
        >
          <Input disabled={!authorize(currentUser.accessLvls, 'users_write')} />
        </Form.Item>
        <Form.Item
          label='Password'
          type='password'
          name='password'
          rules={
            paramId
              ? null
              : [{ required: true, message: 'Password is required.' }]
          }
        >
          <Input.Password
            disabled={!authorize(currentUser.accessLvls, 'users_write')}
          />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          rules={
            paramId
              ? [
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
                ]
              : [
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
                ]
          }
        >
          <Input.Password
            disabled={!authorize(currentUser.accessLvls, 'users_write')}
          />
        </Form.Item>
        <Form.Item
          label='Display Name'
          name='displayName'
          rules={[{ required: true, message: 'Display Name is required.' }]}
        >
          <Input disabled={!authorize(currentUser.accessLvls, 'users_write')} />
        </Form.Item>

        <Form.Item label='Phone Number (+1 xxx xxx xxxx)' name='phoneNumber'>
          <Input disabled={!authorize(currentUser.accessLvls, 'users_write')} />
        </Form.Item>

        <Form.Item label='Disabled' name='disabled'>
          <Select disabled={!authorize(currentUser.accessLvls, 'users_write')}>
            <Select.Option value={false}>False</Select.Option>
            <Select.Option value={true}>True</Select.Option>
          </Select>
        </Form.Item>

        <h2>Access Levels</h2>
        <Form.Item name='accessLvls'>
          <Checkbox.Group>
            <Row gutter={32}>
              {allAccessLvls.map((accessLvlType, i) => (
                <Col key={`accesstype-${i}`}>
                  <h3>{accessLvlType.type}</h3>
                  {accessLvlType.accessLvls.map((accessLvl, i) => (
                    <Checkbox
                      value={`${accessLvlType.type.toLowerCase()}_${accessLvl}`}
                      key={`accesslvl-${i}`}
                      disabled={
                        !authorize(currentUser.accessLvls, 'users_write')
                      }
                    >
                      {accessLvl}
                    </Checkbox>
                  ))}
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        {data.creationTime || data.lastSignInTime || data.lastRefreshTime ? (
          <h2>Meta Data</h2>
        ) : (
          ''
        )}
        {data.creationTime && <p>{`Created: ${data.creationTime}`}</p>}
        {data.lastSignInTime && <p>{`Last Sign In: ${data.lastSignInTime}`}</p>}
        {data.lastRefreshTime && (
          <p>{`Last Refresh Time: ${data.lastRefreshTime}`}</p>
        )}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              formLoading ||
              loading ||
              !authorize(currentUser.accessLvls, 'users_write')
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UserDetails
