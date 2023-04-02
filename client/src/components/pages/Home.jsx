import { useEffect } from 'react'
import { useFetch } from '../../hooks'
const Home = () => {
  const { data, error, loading } = useFetch('/questions')
  useEffect(() => {
    document.title = 'Home'
  }, [])

  let content
  if (loading) {
    content = <div>Loading...</div>
  } else if (error) {
    content = <div>{error}</div>
  } else if (data) {
    content = <div>{JSON.stringify(data)}</div>
  }

  return <div>{content}</div>
}

export default Home