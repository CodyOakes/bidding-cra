import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

import HeaderNav from '../navigation/HeaderNav'
import SiderNav from '../navigation/SiderNav'

import { Layout } from 'antd'
const { Content } = Layout

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Layout style={{ minHeight: '100vh' }}>
            <SiderNav />
            <Layout>
              <HeaderNav />
              <Layout className='main-section'>
                <Content>
                  <Component {...props} />
                </Content>
              </Layout>
            </Layout>
          </Layout>
        ) : (
          <Redirect to='/login' />
        )
      }
    ></Route>
  )
}

export default PrivateRoute
