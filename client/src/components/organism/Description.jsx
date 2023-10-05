import { HiFlag, HiPencilSquare, HiTrash } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

import { openDialog, setIsLoading } from '../../store/features/dialogSlice'
import { useDeleteQuestionMutation } from '../../store/api/questionApi'
import { useReportQuestionMutation } from '../../store/api/reportApi'
import { dangerMsg, successReportMsg } from '../../constants/dialogMessage'
import { useSuccessProsess } from '../../hooks'
import { Button, Info } from '../atoms'

const Description = ({ question }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const reportMsg = successReportMsg('soal')
  const user = useSelector((state) => state.auth.userInfo)

  const [report, { isSuccess: isSuccessReport, isLoading: isLoadingReport }] = useReportQuestionMutation()
  const [deleteQuestion, { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }] = useDeleteQuestionMutation()
  useSuccessProsess({ isLoading: isLoadingReport, isSuccess: isSuccessReport, ...reportMsg })

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(setIsLoading(false))
      toast.success('Soal berhasil dihapus')
    }
    if (isLoadingDelete) dispatch(setIsLoading(true))
  }, [isLoadingDelete, isSuccessDelete])

  const handleReport = () => {
    const msg = dangerMsg('laporkan', 'soal')
    const data = { questionId: question._id, userQuestionId: question.user._id }
    dispatch(openDialog({ ...msg, handler: () => report({ ...data }) }))
  }

  const handleDelete = () => {
    const msg = dangerMsg('hapus', 'soal')
    dispatch(
      openDialog({
        ...msg,
        handler: async () => {
          await deleteQuestion(question._id).unwrap()
          navigate('/')
        }
      })
    )
  }

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-font p-3 md:gap-7 md:p-6">
      <table cellPadding={5} className="block w-fit">
        <tbody className="text-xs text-white sm:text-base">
          <Info title="Mata Kuliah" content={question.mataKuliah} />
          <Info title="Fakultas" content={question.fakultas} />
          <Info title="Program Studi" content={question.programStudi} />
          <Info title="Tahun Ajaran" content={question.tahunAjaran} />
          <Info title="Semester" content={question.semester} />
          <Info title="Kategori" content={question.kategori} />
          <Info title="Dosen" content={question.dosen} />
        </tbody>
      </table>
      {user && (
        <div className="flex gap-3">
          {user._id === question.user._id ? (
            <>
              <Button variant="base" className="flex-1 gap-2" onClick={() => navigate(`/update/${question._id}`)}>
                <HiPencilSquare className="text-sm md:text-base" />
                Ubah Soal
              </Button>
              <Button variant="danger" className="flex-1 gap-2" onClick={handleDelete}>
                <HiTrash className="text-sm md:text-base" />
                Hapus Soal
              </Button>
            </>
          ) : (
            <Button variant="danger" className="flex-1 gap-2" onClick={handleReport}>
              <HiFlag className="text-sm md:text-base" />
              Laporkan Soal Ini
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Description
