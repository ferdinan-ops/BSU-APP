import { useEffect } from 'react'
import { useFetch } from '../../../hooks'
import { Post, Promote } from '../../common/organism'
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
    <section className="z-0 flex min-h-[calc(100vh-100px)] justify-between bg-slate-100">
      <div className="container mx-auto flex gap-20 py-[60px]">
        <div className="flex flex-[2.3] flex-col gap-8">{content}</div>
        <Promote />
      </div>
    </section>
  )
}

export default Home
