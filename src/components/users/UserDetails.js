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
                type: 'Customer',
                firstName: '',
                lastName: '',
                phoneNumber: '+1 208 ',
                disabled: false,
                address1: '',
                address2: '',
                city: 'Burley',
                state: 'ID',
                zip: '83318',
              }
        }
      >
        <h2>{paramId ? `Edit User: ${data.uid}` : 'Add User'}</h2>
        <Row gutter={[32, 32]}>
          <Col>
            <h3>Account</h3>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Email is required.' }]}
            >
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
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
                      {
                        required: true,
                        message: 'Confirm Password is required.',
                      },
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
            <Form.Item label='Account Type' name='type'>
              <Select
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              >
                <Select.Option value='Customer'>Customer</Select.Option>
                <Select.Option value='Employee'>Employee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Disabled' name='disabled'>
              <Select
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              >
                <Select.Option value={false}>False</Select.Option>
                <Select.Option value={true}>True</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <h3>Personal</h3>
            <Form.Item
              label='First Name'
              name='firstName'
              rules={[{ required: true, message: 'First Name is required.' }]}
            >
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[{ required: true, message: 'Last Name is required.' }]}
            >
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>

            <Form.Item
              label='Phone Number (+1 xxx xxx xxxx)'
              name='phoneNumber'
            >
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
          </Col>

          <Col>
            <h3>Address</h3>
            <Form.Item label='Address 1' name='address1'>
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
            <Form.Item label='Address 2' name='address2'>
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
            <Form.Item label='City' name='city'>
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
            <Form.Item label='State' name='state'>
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
            <Form.Item label='Zip' name='zip'>
              <Input
                disabled={!authorize(currentUser.accessLvls, 'users_write')}
              />
            </Form.Item>
          </Col>
        </Row>
        <h3>Access Levels</h3>
        <Row>
          <Form.Item name='accessLvls'>
            <Checkbox.Group>
              <Row gutter={[32, 32]}>
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
        </Row>
        <Row>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            {data.creationTime ||
            data.lastSignInTime ||
            data.lastRefreshTime ? (
              <h3>Meta Data</h3>
            ) : (
              ''
            )}
            {data.creationTime && <p>{`Created: ${data.creationTime}`}</p>}
            {data.lastSignInTime && (
              <p>{`Last Sign In: ${data.lastSignInTime}`}</p>
            )}
            {data.lastRefreshTime && (
              <p>{`Last Refresh Time: ${data.lastRefreshTime}`}</p>
            )}
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default UserDetails
