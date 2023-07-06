import { useParams } from 'react-router-dom'
import { GiFullFolder } from 'react-icons/gi'

import { Post, PostSkeleton } from '../components'
import { useGetUserQuestionsQuery } from '../store/api/userApi'
import NoData from '../components/molecules/NoData'
import { useSelector } from 'react-redux'

const User = () => {
  const { userId } = useParams()
  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading } = useGetUserQuestionsQuery(userId)

  let content
  if (isLoading) {
    content = [...Array(3)].map((_, i) => <PostSkeleton key={i} />)
  } else if (isSuccess && posts.data.length > 0) {
    content = posts.data.map((post) => <Post key={post._id} post={post} className="border-2" />)
  } else if (isSuccess && posts.data.length === 0) {
    content = (
      <NoData
        Icon={GiFullFolder}
        title="Tidak ada soal yang dimiliki"
        text={
          user._id === userId
            ? 'Anda belum pernah mengupload soal?. Ayo, upload soal pertamamu sekarang'
            : 'Pengguna ini belum pernah mengupload soal apapun'
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

export default User
