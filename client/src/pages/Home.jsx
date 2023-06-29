import { useGetQuestionsQuery } from '../store/api/questionApi'
import { Container, Post, PostSkeleton, Section } from '../components'

const Home = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetQuestionsQuery()

  let content
  if (isLoading) {
    content = [...Array(6)].map((_, i) => <PostSkeleton key={i} />)
  } else if (isSuccess) {
    content = posts.data.map((post) => <Post key={post._id} post={post} />)
  } else if (isError) {
    content = <p>{error.message}</p>
  }

  return (
    <Section title="Beranda" className="z-0 min-h-[calc(100vh-100px)] bg-slate-100">
      <Container className="mt-5 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 xl:grid-cols-3">{content}</Container>
    </Section>
  )
}

export default Home
