import React from 'react'
import { Router, Switch } from 'react-router-dom'
import history from './history'

import { AuthProvider } from '../../contexts/AuthContext'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import PublicWebsite from '../public/PublicWebsite'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ChangePasswordUser from '../auth/ChangePasswordUser'
import UserDetails from '../users/UserDetails'
import Users from '../users/Users'
import NotFound from '../shared/NotFound'

const AppRouter = () => {
  return (
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <PublicRoute exact path='/' component={PublicWebsite} />
          <PublicRoute path='/login' component={Login} />
          <PublicRoute path='/forgot-password' component={ForgotPassword} />
          <PrivateRoute path='/update-profile' component={ChangePasswordUser} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/users/' component={Users} />
          <PrivateRoute path='/users/new' component={UserDetails} />
          <PrivateRoute path='/users/:id' component={UserDetails} />
          <PublicRoute component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default AppRouter
