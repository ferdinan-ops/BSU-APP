import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { useGetUserLikeQuestionsQuery } from '../store/api/userApi'
import { NoData, Pagination, Posts } from '../components'
import clsx from 'clsx'

const UserLike = () => {
  const { userId } = useParams()
  const [page, setPage] = useState(1)

  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading, isFetching } = useGetUserLikeQuestionsQuery({ userId, page })

  return (
    <div className={clsx(isSuccess && posts.data.length === 0 && 'my-10 flex justify-center')}>
<<<<<<< HEAD
      {isSuccess && posts.data.length > 0 && (
        <Posts isLoading={isLoading} isSuccess={isSuccess} posts={posts} className="border-2" />
      )}
=======
      <Posts isLoading={isLoading} isSuccess={isSuccess} posts={posts} className="border-2" />
>>>>>>> 5d1be214b8273c62b6e84deee237bb7e0bbf953c
      {isSuccess && posts.data.length === 0 && (
        <NoData
          Icon={GiFullFolder}
          title="Tidak ada soal yang disukai"
          text={
            user._id === userId
              ? 'Anda belum pernah menyukai soal?. Ayo, sukai soal pertamamu sekarang'
              : 'Pengguna ini belum pernah menyukai soal apapun'
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

export default UserLike
