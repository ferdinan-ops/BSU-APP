import InfiniteScroll from 'react-infinite-scroll-component'

import PostSkeleton from './PostSkeleton'
import { Container } from '../../atoms'
import Post from './Post'

const Posts = ({ posts, handler, className }) => {
  return (
    <InfiniteScroll
      dataLength={posts.total_data}
      next={handler}
      hasMore={posts?.total_data > posts?.data?.length}
      loader={<PostSkeleton count={3} />}
    >
      <Container className="mb-10 mt-5 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
        {posts.data?.map((post) => (
          <Post key={post._id} post={post} className={className} />
        ))}
      </Container>
    </InfiniteScroll>
  )
}

export default Posts
