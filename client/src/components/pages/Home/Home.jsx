import { useEffect } from 'react'
import { useFetch } from '../../../hooks'
import { Post } from '../../common/organism'
const Home = () => {
  const { data, error, loading } = useFetch('/questions')
  useEffect(() => {
    document.title = 'BSU ~ Home'
  }, [])

  let content
  if (loading) {
    content = <div>Loading...</div>
  } else if (error) {
    content = <div>{error}</div>
  } else if (data) {
    content = data.data.map((post) => <Post key={post._id} post={post} />)
  }

  return (
    <section className="min-h-[calc(100vh-80px)] justify-between bg-slate-100">
      <div className="container mx-auto flex gap-8 pt-[60px]">
        <div className="h-20 flex-1 bg-white"></div>
        <div className="flex flex-[2] flex-col gap-5">{content}</div>
        <div className="h-20 flex-1 bg-white"></div>
      </div>
    </section>
  )
}

export default Home
