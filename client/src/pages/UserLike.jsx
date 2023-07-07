import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'

import { useGetUserLikeQuestionsQuery } from '../store/api/userApi'
import NoData from '../components/molecules/NoData'
import { Post, PostSkeleton } from '../components'
import { useSelector } from 'react-redux'

const UserLike = () => {
  const { userId } = useParams()
  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading } = useGetUserLikeQuestionsQuery(userId)

  let content
  if (isLoading) {
    content = [...Array(3)].map((_, i) => <PostSkeleton key={i} />)
  } else if (isSuccess && posts.data.length > 0) {
    content = posts.data.map((post) => <Post key={post._id} post={post} className="border-2" />)
  } else if (isSuccess && posts.data.length === 0) {
    content = (
      <NoData
        Icon={GiFullFolder}
        title="Tidak ada soal yang disukai"
        text={
          user._id === userId
            ? 'Anda belum pernah menyukai soal?. Ayo, sukai soal pertamamu sekarang'
            : 'Pengguna ini belum pernah menyukai soal apapun'
        }
      />
    )
  }
  return (
    <div
      className={
        isSuccess && posts.data.length === 0
          ? 'flex justify-center'
          : 'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'
      }
    >
      {content}
    </div>
  )
}

export default UserLike
