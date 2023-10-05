import { HiEllipsisHorizontal, HiOutlinePencil, HiOutlineTrash, HiOutlineFlag } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { dangerMsg, successReportMsg } from '../../constants/dialogMessage'
import { openDialog, setIsLoading } from '../../store/features/dialogSlice'
import { useDeleteCommentMutation } from '../../store/api/commentApi'
import { useReportCommentMutation } from '../../store/api/reportApi'
import { setComment } from '../../store/features/commentSlice'
import { useSuccessProsess } from '../../hooks'
import { Icon } from '../atoms'
import { toast } from 'react-hot-toast'

const More = ({ comment, questionId }) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const reportMsg = successReportMsg('komentar')
  const user = useSelector((state) => state.auth.userInfo)

  const [deleteComment, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] = useDeleteCommentMutation()
  const [reportComment, { isLoading: isLoadingReport, isSuccess: isSuccessReport }] = useReportCommentMutation()
  useSuccessProsess({ isLoading: isLoadingReport, isSuccess: isSuccessReport, ...reportMsg })

  useEffect(() => {
    if (isLoadingDelete) dispatch(setIsLoading(true))
    if (isSuccessDelete) {
      dispatch(setIsLoading(false))
      toast.success('Komentar berhasil dihapus')
    }
  }, [isLoadingDelete, isSuccessDelete])

  const handleDelete = () => {
    setShow(false)
    const msg = dangerMsg('hapus', 'komentar')
    dispatch(openDialog({ ...msg, handler: () => deleteComment(comment._id) }))
  }

  const handleReport = () => {
    setShow(false)
    const msg = dangerMsg('laporkan', 'komentar')
    const data = { questionId, userCommentId: comment.user._id }
    dispatch(openDialog({ ...msg, handler: () => reportComment({ ...data }) }))
  }

  const handleEdit = () => {
    dispatch(setComment(comment))
    setShow(false)
  }

  return (
    <div className="relative font-source font-semibold">
      <Icon className="h-6 w-6 md:h-7 md:w-7" onClick={() => setShow(!show)}>
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
