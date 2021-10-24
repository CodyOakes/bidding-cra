import React from 'react'

import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <h1>Dashboard</h1>
      <p>{`Welcome ${currentUser.displayName}`}</p>
    </>
  )
}

export default Dashboard
