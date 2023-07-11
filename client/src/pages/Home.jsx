import { useGetQuestionsByKeywordQuery, useGetQuestionsQuery } from '../store/api/questionApi'
import { PostSkeleton, Posts, Section } from '../components'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  let posts
  if (search) {
    posts = useGetQuestionsByKeywordQuery({ search, page })
  } else {
    posts = useGetQuestionsQuery(page)
  }

  return (
    <Section title="Beranda" className="z-0 min-h-[calc(100vh-100px)] bg-slate-100">
      {posts.isLoading ? (
        <PostSkeleton count={6} />
      ) : (
        posts.isSuccess && <Posts posts={posts.data} handler={() => setPage(page + 1)} />
      )}
    </Section>
  )
}

export default Home
