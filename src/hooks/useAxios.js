import { useEffect, useState, useRef } from 'react'
import { message } from 'antd'

import api from '../utils/api'

const useAxios = (httpMethod, url, initalData) => {
  const initalDataRef = useRef(initalData)
  const [data, setData] = useState(initalData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let inital = initalDataRef.current

    const runQuery = async () => {
      setLoading(true)
      try {
        const res = await api[httpMethod](url)
        const payload = res.data
        setData(payload)
      } catch (error) {
        const errs = error.response.data.errors
        if (errs) {
          errs.forEach((err) => {
            message.error(`${err.msg}`)
          })
        }
      }
      setLoading(false)
    }

    if (url) {
      runQuery()
    } else {
      setLoading(false)
    }

    return () => {
      setData(inital)
    }
  }, [url, httpMethod])

  return [{ data, loading }, setData]
}

export default useAxios
