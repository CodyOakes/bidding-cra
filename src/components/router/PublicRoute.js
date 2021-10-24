import React from 'react'
import { Route } from 'react-router-dom'

const PublicRoute = ({ ...rest }) => <Route {...rest} />

export default PublicRoute
