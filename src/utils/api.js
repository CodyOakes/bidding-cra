import axios from 'axios'
import { auth } from '../config/firebase'

let baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASEURL_PRODUCTION
    : process.env.REACT_APP_BASEURL_DEVELOPMENT

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    const token = user && (await user.getIdToken())
    config.headers.token = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
