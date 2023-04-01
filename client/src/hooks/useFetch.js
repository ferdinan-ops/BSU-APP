import { useEffect, useState } from 'react'
import useAxios from './useAxios'
import { useLocation, useNavigate } from 'react-router-dom'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const api = useAxios({ contentType: 'Application/json' })

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(url)
        setData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
        if (error.response.status === 401) navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
