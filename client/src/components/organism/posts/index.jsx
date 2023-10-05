import Post from './Post'
import { Container } from '../../atoms'
import PostSkeleton from './PostSkeleton'

const Posts = ({ posts, className, isLoading, isSuccess }) => {
  return (
    <Container className="my-5 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
      {isLoading && <PostSkeleton count={6} />}
      {isSuccess &&
        posts.data.length > 0 &&
        posts.data?.map((post) => <Post key={post._id} post={post} className={className} />)}
    </Container>
  )
}

export default Posts
