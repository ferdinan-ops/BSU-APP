import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { useGetUserQuestionsQuery } from '../store/api/userApi'
import { PostSkeleton, Posts, NoData } from '../components'
import clsx from 'clsx'

const User = () => {
  const { userId } = useParams()
  const [page, setPage] = useState(1)
  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading } = useGetUserQuestionsQuery(userId, page)

  let content
  if (isLoading) {
    content = <PostSkeleton count={3} />
  } else if (isSuccess && posts.data.length > 0) {
    content = <Posts posts={posts} handler={() => setPage(page + 1)} className="border-2" />
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
  return <div className={clsx(isSuccess && posts.data.length === 0 && 'my-10 flex justify-center')}>{content}</div>
}

export default User
