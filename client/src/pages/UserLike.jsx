import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { useGetUserLikeQuestionsQuery } from '../store/api/userApi'
import { PostSkeleton, Posts, NoData } from '../components'

const UserLike = () => {
  const { userId } = useParams()
  const [page, setPage] = useState(1)
  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading } = useGetUserLikeQuestionsQuery(userId, page)

  let content
  if (isLoading) {
    content = <PostSkeleton count={3} />
  } else if (isSuccess && posts.data.length > 0) {
    content = <Posts posts={posts} handler={() => setPage(page + 1)} className="border-2" />
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
  return <div className={isSuccess && posts.data.length === 0 && 'my-10 flex justify-center'}>{content}</div>
}

export default UserLike
