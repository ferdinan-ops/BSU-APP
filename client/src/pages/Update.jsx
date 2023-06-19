// import { questionSchema, questionValues } from '../validations/question.validation'
// import { getQuestion, updateQuestion } from '../store/features/questionSlice'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { privateApi } from '../services'
// import { useFormik } from 'formik'
// import { useEffect } from 'react'
// import { Button, Dropdown, TextField, Upload } from '../components/common'
// import { categoriesList, semesterList } from '../constants/listData'
// import { Waveform } from '@uiball/loaders'

const Update = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const { postId } = useParams()

  // const API = privateApi({ contentType: 'multipart/form-data' })
  // const { question, loading } = useSelector((state) => state.question)

  // useEffect(() => {
  //   dispatch(getQuestion({ API, id: postId }))
  // }, [dispatch])

  // const handleSubmit = async (values) => {
  //   console.log({ values })
  //   const newData = new FormData()
  //   newData.append('mataKuliah', values.mataKuliah)
  //   newData.append('fakultas', values.fakultas)
  //   newData.append('programStudi', values.programStudi)
  //   newData.append('tahunAjaran', values.tahunAjaran)
  //   newData.append('semester', values.semester)
  //   newData.append('kategori', values.kategori)
  //   newData.append('dosen', values.dosen)
  //   values.images.forEach((image) => {
  //     newData.append('images', image)
  //   })
  //   await dispatch(updateQuestion({ API, id: postId, fields: newData })).unwrap()
  //   navigate('/')
  // }

  // const formik = useFormik({
  //   initialValues: questionValues,
  //   validationSchema: questionSchema,
  //   onSubmit: handleSubmit
  // })

  // useEffect(() => {
  //   if (!loading && question) {
  //     formik.setFieldValue('mataKuliah', question.mataKuliah)
  //     formik.setFieldValue('fakultas', question.fakultas)
  //     formik.setFieldValue('programStudi', question.programStudi)
  //     formik.setFieldValue('tahunAjaran', question.tahunAjaran)
  //     formik.setFieldValue('semester', question.semester)
  //     formik.setFieldValue('kategori', question.kategori)
  //     formik.setFieldValue('dosen', question.dosen)
  //     formik.setFieldValue('images', question.images)
  //   }
  // }, [loading, question])

  // console.log({ question, formik: formik.values })

  return (
    <>
      {/* {!loading && question ? (
        <section className="container mx-auto w-full px-[18px] py-[40px] xl:px-0 xl:py-[60px]">
          <div className="mx-auto w-full md:w-10/12 xl:w-8/12">
            <h1 className="text-center text-xl font-bold uppercase md:text-[32px]">
              Ubah soal: {formik.values.mataKuliah}
            </h1>
            <form className="mt-[40px] flex flex-col gap-6 md:mt-[60px] xl:gap-8" onSubmit={formik.handleSubmit}>
              <TextField
                label="Mata Kuliah"
                placeholder="Matematika Diskrit"
                error={formik.touched.mataKuliah && formik.errors.mataKuliah}
                {...formik.getFieldProps('mataKuliah')}
              />
              <TextField
                label="Fakultas"
                placeholder="Ilmu Komputer"
                error={formik.touched.fakultas && formik.errors.fakultas}
                {...formik.getFieldProps('fakultas')}
              />
              <TextField
                label="Program Studi"
                placeholder="Teknik Informatika"
                error={formik.touched.programStudi && formik.errors.programStudi}
                {...formik.getFieldProps('programStudi')}
              />
              <TextField
                label="Nama Dosen"
                placeholder="Budi Harianja, S.Kom, M.Kom"
                error={formik.touched.dosen && formik.errors.dosen}
                {...formik.getFieldProps('dosen')}
              />
              <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-5">
                <div className="w-full">
                  <TextField
                    label="Tahun Ajaran"
                    placeholder="2020/2021"
                    error={formik.touched.tahunAjaran && formik.errors.tahunAjaran}
                    {...formik.getFieldProps('tahunAjaran')}
                  />
                </div>
                <div className="w-full">
                  <Dropdown
                    title="Semester"
                    options={semesterList}
                    value={formik.values.semester}
                    onChange={(value) => formik.setFieldValue('semester', value)}
                  />
                </div>
                <div className="w-full">
                  <Dropdown
                    title="Kategori"
                    options={categoriesList}
                    value={formik.values.kategori}
                    onChange={(value) => formik.setFieldValue('kategori', value)}
                  />
                </div>
              </div>
              <Upload
                img={formik.values.images}
                setImg={(value) => formik.setFieldValue('images', value)}
                error={formik.touched.images && formik.errors.images}
              />
              <Button
                className="ml-auto w-fit bg-primary px-6 font-bold text-white shadow-button hover:bg-primary-hover"
                isLoading={loading}
                type="submit"
              >
                Upload Soal
              </Button>
            </form>
          </div>
        </section>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
        </div>
      )} */}
    </>
  )
}

export default Update
