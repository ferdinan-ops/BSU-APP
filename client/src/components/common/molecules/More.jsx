import { HiEllipsisHorizontal, HiOutlinePencil, HiOutlineTrash, HiOutlineFlag } from 'react-icons/hi2'
import { deleteQuestion, getQuestions } from '../../../store/features/questionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAxios } from '../../../hooks'
import { useState } from 'react'

const More = ({ postUserId, postId }) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const API = useAxios({ contentType: 'application/json' })
  const { userInfo } = useSelector((state) => state.auth)

  const handleDelete = async () => {
    const ask = window.confirm('Apakah anda yakin ingin menghapus soal ini?')
    if (ask) {
      await dispatch(deleteQuestion({ API, id: postId })).unwrap()
      await dispatch(getQuestions(API)).unwrap()
    }
  }

  return (
    <div className="relative font-source font-semibold">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-slate-200"
        onClick={() => setShow(!show)}
      >
        <HiEllipsisHorizontal className="text-2xl text-font" />
      </div>
      <ul
        className={`absolute right-0 top-full flex origin-top-right flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all ${
          show ? 'scale-100' : 'scale-0'
        }`}
      >
        {userInfo._id === postUserId ? (
          <>
            <li className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-slate-200">
              <HiOutlinePencil className="text-lg text-font" />
              <span>Ubah</span>
            </li>
            <li
              className="flex cursor-pointer items-center gap-4 px-4 py-2 text-red-500 hover:bg-slate-200"
              onClick={handleDelete}
            >
              <HiOutlineTrash className="text-lg" />
              <span>Hapus</span>
            </li>
          </>
        ) : (
          <li className="flex cursor-pointer items-center gap-4 px-4 py-2 text-red-500 hover:bg-slate-200">
            <HiOutlineFlag className="text-lg" />
            <span>Laporkan</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default More
