import * as Yup from 'yup'

export const questionSchema = Yup.object().shape({
  mataKuliah: Yup.string().required('Mata kuliah harus diisi'),
  fakultas: Yup.string().required('Fakultas harus diisi'),
  programStudi: Yup.string().required('Program Studi harus diisi'),
  dosen: Yup.string().required('Nama Dosen harus diisi'),
  tahunAjaran: Yup.string().required('Tahun Ajaran harus diisi'),
  images: Yup.mixed().required('Gambar harus di upload'),
  semester: Yup.mixed().test('required', 'Semester harus diisi', (value) => value !== ''),
  kategori: Yup.mixed().test('required', 'Kategori harus diisi', (value) => value !== '')
})
