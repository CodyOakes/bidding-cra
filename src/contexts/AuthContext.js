import React, { useContext, useState, useEffect } from 'react'
import { message } from 'antd'

import { auth } from '../config/firebase'
import api from '../utils/api'

const AuthContext = React.createContext()

export const authorize = (accessLvls, accessRequired) => {
  if (accessLvls && accessRequired) {
    return accessLvls.includes(accessRequired)
  } else {
    return false
  }
}

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // sets the user so that the get users accesslvls route can authenticate a user
          await setCurrentUser({ ...user })
          const res = await api.get(`/users/accesslvls/${user.email}`)
          const accessLvls = res.data
          await setCurrentUser({ ...user, ...accessLvls })
        }
        setLoading(false)
      } catch (error) {
        const errs = error.response.data.errors
        if (errs) {
          errs.forEach((err) => {
            message.error(`${err.msg}`)
          })
        }
        setLoading(false)
      }
    })

    // unsubscribes from the auth.onAuthStateChange above, when component unmounts
    return unsubscribe
  }, [])

  const value = {
    currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
