import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { logout } from '../../actions/users'

import { Layout, Menu, message } from 'antd'
const { Header } = Layout

const HeaderNav = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { currentUser } = useAuth()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
      history.push('/login')
    } catch (error) {
      message.error(`${error.code}: ${error.message}`)
      setLoading(false)
    }
  }
  return (
    <Header>
      <Menu theme='dark' mode='horizontal' style={{ float: 'right' }}>
        <Menu.Item key='currentUser'>
          <Link to='/update-profile'>Logged in as: {currentUser.email}</Link>
        </Menu.Item>
        <Menu.Item key='logout' onClick={handleLogout} disabled={loading}>
          Log Out
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderNav
