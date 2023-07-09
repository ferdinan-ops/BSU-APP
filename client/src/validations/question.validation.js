import * as Yup from 'yup'

export const questionSchema = Yup.object().shape({
  mataKuliah: Yup.string().required('Mata kuliah harus diisi'),
  fakultas: Yup.string().required('Fakultas harus diisi'),
  programStudi: Yup.string().required('Program Studi harus diisi'),
  dosen: Yup.string().required('Nama Dose harus diisi'),
  tahunAjaran: Yup.string().required('Tahun Ajaran harus diisi'),
  images: Yup.mixed().required('Gambar harus di upload'),
  semester: Yup.object()
    .shape({
      value: Yup.string().required('Semester harus diisi'),
      label: Yup.string().required('Semester harus diisi')
    })
    .required('Semester harus diisi')
    .nullable(),
  kategori: Yup.object()
    .shape({
      value: Yup.string().required('Kategori harus diisi'),
      label: Yup.string().required('Kategori harus diisi')
    })
    .required('Kategori harus diisi')
    .nullable()
})
