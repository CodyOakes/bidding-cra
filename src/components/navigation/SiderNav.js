import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth, authorize } from '../../contexts/AuthContext'

import { UserOutlined, RocketOutlined } from '@ant-design/icons'

import { Layout, Menu } from 'antd'
const { SubMenu } = Menu
const { Sider } = Layout

const SiderNav = () => {
  const { currentUser } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleOnCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={handleOnCollapse}>
      <Menu
        theme='dark'
        mode='inline'
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key='logo' title='Bidding' icon={<RocketOutlined />}>
          <Link to='/dashboard'>BiddingApp</Link>
        </Menu.Item>
        {authorize(currentUser.accessLvls, 'users_read') && (
          <SubMenu key='users' title='Users' icon={<UserOutlined />}>
            <Menu.Item key='users-listuser'>
              <Link to='/users'>List Users</Link>
            </Menu.Item>
            {authorize(currentUser.accessLvls, 'users_write') && (
              <Menu.Item key='users-adduser'>
                <Link to='/users/new'>Add User</Link>
              </Menu.Item>
            )}
          </SubMenu>
        )}
      </Menu>
    </Sider>
  )
}

export default SiderNav
