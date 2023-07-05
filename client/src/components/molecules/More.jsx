import { HiEllipsisHorizontal, HiOutlinePencil, HiOutlineTrash, HiOutlineFlag } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { setComment } from '../../store/features/commentSlice'
import { Icon } from '../atoms'
import { useDeleteCommentMutation } from '../../store/api/commentApi'
import { openDialog, setIsLoading } from '../../store/features/dialogSlice'

const More = ({ comment }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.userInfo)
  const [deleteComment, { isLoading, isSuccess }] = useDeleteCommentMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoading(false))
    }
    if (isLoading) {
      dispatch(setIsLoading(true))
    }
  }, [isLoading, isSuccess])

  const handleDelete = () => {
    setShow(false)
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Hapus Komentar',
        content:
          'Apakah Anda yakin ingin menghapus komentar ini? Komentar ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.',
        buttonText: 'Hapus',
        variant: 'danger',
        handler: () => deleteComment(comment._id)
      })
    )
  }

  const handleReport = () => {
    setShow(false)
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Laporkan Komentar',
        content:
          'Apakah Anda yakin ingin melaporkan komentar ini? Komentar ini akan dilaporkan kepada admin. Tindakan ini tidak dapat dibatalkan.',
        buttonText: 'Laporkan',
        variant: 'danger',
        handler: () => {}
      })
    )
  }

  const handleEdit = () => {
    dispatch(setComment(comment))
    setShow(false)
  }

  return (
    <div className="relative font-source font-semibold">
      <Icon className="h-7 w-7" onClick={() => setShow(!show)}>
        <HiEllipsisHorizontal className="text-xl text-font" />
      </Icon>
      <ul
        className={clsx(
          'absolute right-0 top-full mt-1 origin-top-right',
          'flex flex-col overflow-hidden bg-white',
          'rounded-md shadow-md transition-all',
          show ? 'scale-100' : 'scale-0'
        )}
      >
        {user._id === comment.user._id ? (
          <>
            <li className="list-more" onClick={handleEdit}>
              <HiOutlinePencil className="text-[15px] text-font" />
              <span>Ubah</span>
            </li>
            <li className="list-more text-red-500" onClick={handleDelete}>
              <HiOutlineTrash className="text-[15px]" />
              <span>Hapus</span>
            </li>
          </>
        ) : (
          <li className="list-more text-red-500" onClick={handleReport}>
            <HiOutlineFlag className="text-[15px]" />
            <span>Laporkan</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default More
