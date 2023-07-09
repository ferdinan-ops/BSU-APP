import { HiFlag, HiPencilSquare, HiTrash } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'

import { openDialog } from '../../store/features/dialogSlice'
import { Button, Info } from '../atoms'
import { useNavigate } from 'react-router-dom'

const Description = ({ question }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userInfo)

  const handleReport = () => {
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Laporkan Soal',
        content:
          'Apakah Anda yakin ingin melaporkan soal ini? Soal ini akan dilaporkan kepada admin. Tindakan ini tidak dapat dibatalkan.',
        buttonText: 'Laporkan',
        variant: 'danger',
        handler: () => {}
      })
    )
  }

  const handleDelete = () => {
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Hapus Soal',
        content:
          'Apakah Anda yakin ingin menghapus soal ini? Soal ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.',
        buttonText: 'Hapus',
        variant: 'danger',
        handler: () => {}
      })
    )
  }

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-font p-3 md:gap-7 md:p-6">
      <table cellPadding={5} className="block w-fit">
        <tbody className="text-xs text-white md:text-base">
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
