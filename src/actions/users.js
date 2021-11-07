import { auth } from '../config/firebase'
import api from '../utils/api'

import { message } from 'antd'

export const login = async (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const logout = () => auth.signOut()

export const resetPassword = (email) => auth.sendPasswordResetEmail(email)

export const postUser = async (values) => {
  try {
    const res = await api.post(`/users`, { ...values })
    const payload = res.data
    message.success(
      `Success! You have successfully created user with email: ${payload.email}`
    )
    return payload
  } catch (error) {
    console.error(error)
    const errs = error.response.data.errors
    if (errs) {
      errs.forEach((err) => {
        message.error(err.msg)
      })
    }
  }
}

export const patchUser = async (values, paramId) => {
  try {
    const res = await api.patch(`/users/${paramId}`, {
      ...values,
    })
    const payload = res.data
    message.success(
      `Success! You have successfully updated user with email: ${payload.email}`
    )
    return payload
  } catch (error) {
    console.error(error)
    const errs = error.response.data.errors
    if (errs) {
      errs.forEach((err) => {
        message.error(err.msg)
      })
    }
  }
}

export const deleteUser = async (uid) => {
  try {
    await api.delete(`/users/${uid}`)
    message.success(
      `Success! You have successfully deleted user with id: ${uid}`
    )
  } catch (error) {
    console.error(error)
    const errs = error.response.data.errors
    if (errs) {
      errs.forEach((err) => {
        message.error(err.msg)
      })
    }
  }
}
