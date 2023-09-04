import { GiFullFolder } from 'react-icons/gi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { useGetUserSaveQuestionsQuery } from '../store/api/userApi'
import { NoData, Pagination, Posts } from '../components'
import clsx from 'clsx'

const UserSave = () => {
  const { userId } = useParams()
  const [page, setPage] = useState(1)

  const user = useSelector((state) => state.auth.userInfo)
  const { data: posts, isSuccess, isLoading, isFetching } = useGetUserSaveQuestionsQuery({ userId, page })

  return (
    <div className={clsx(isSuccess && posts.data.length === 0 && 'my-10 flex justify-center')}>
      {isSuccess && posts.data.length > 0 && (
        <Posts isLoading={isLoading} isSuccess={isSuccess} posts={posts} className="border-2" />
      )}
      {isSuccess && posts.data.length === 0 && (
        <NoData
          Icon={GiFullFolder}
          title="Tidak ada soal yang disimpan"
          text={
            user._id === userId
              ? 'Anda belum pernah menyimpan soal?. Ayo, simpan soal pertamamu sekarang'
              : 'Pengguna ini belum menyimpan soal apapun'
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

export default UserSave
