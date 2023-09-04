import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { useGetUserQuestionsQuery } from '../store/api/userApi'
import { NoData, Pagination, Posts } from '../components'
import clsx from 'clsx'

const User = () => {
  const { userId } = useParams()
  const [page, setPage] = useState(1)

  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading, isFetching } = useGetUserQuestionsQuery({ userId, page })

  return (
    <div className={clsx(isSuccess && posts.data.length === 0 && 'my-10 flex justify-center')}>
      {isSuccess && posts.data.length > 0 && (
        <Posts isLoading={isLoading} isSuccess={isSuccess} posts={posts} className="border-2" />
      )}
      {isSuccess && posts.data.length === 0 && (
        <NoData
          Icon={GiFullFolder}
          title="Tidak ada soal yang dimiliki"
          text={
            user._id === userId
              ? 'Anda belum pernah mengupload soal?. Ayo, upload soal pertamamu sekarang'
              : 'Pengguna ini belum pernah mengupload soal apapun'
          }
        />
      )}
      {isSuccess && posts.total_data > 6 && (
        <Pagination
          handlePrev={() => setPage(page + -1)}
          handleNext={() => setPage(page + 1)}
          page={page}
          posts={{ isFetching, data: posts }}
        />
      )}
    </div>
  )
}

export default User
