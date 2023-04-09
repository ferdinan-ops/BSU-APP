import { categoriesList, semesterList } from '../constants/listData'
import * as Yup from 'yup'

export const questionValues = {
  mataKuliah: '',
  fakultas: '',
  programStudi: '',
  dosen: '',
  tahunAjaran: '',
  semester: semesterList[0],
  kategori: categoriesList[0],
  images: []
}

export const questionSchema = Yup.object({
  mataKuliah: Yup.string().required('Mata kuliah harus diisi'),
  fakultas: Yup.string().required('Fakultas harus diisi'),
  programStudi: Yup.string().required('Program Studi harus diisi'),
  dosen: Yup.string().required('Nama Dose harus diisi'),
  tahunAjaran: Yup.string().required('Tahun Ajaran harus diisi'),
  images: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().max(255).required().label('images')
      })
    )
    .min(1, 'Gambar harus di upload')
})
