import { categoriesList, semesterList } from '../../../constants/listData'
import { questionSchema, questionValues } from '../../../validations/question.schema'
import { Button, Dropdown, TextField, Upload } from '../../common'
import { useEffect } from 'react'
import { useFormik } from 'formik'

const Create = () => {
  useEffect(() => {
    document.title = 'BSU ~ Upload Soal'
  }, [])

  const formik = useFormik({
    initialValues: questionValues,
    validationSchema: questionSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <section className="container mx-auto w-full px-[18px] py-[40px] xl:px-0 xl:py-[60px]">
      <div className="mx-auto w-full md:w-10/12 xl:w-8/12">
        <h1 className="text-center text-xl font-bold uppercase md:text-[32px]">UPLOAD SOAL YANG KAMU PUNYA 😁</h1>
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
            setImg={(value) => formik.setFieldValue('images', [...formik.values.images, ...value])}
            error={formik.errors.images && formik.errors.images}
          />
          <Button
            className="ml-auto w-fit bg-primary px-6 font-bold text-white shadow-button hover:bg-primary-hover"
            type="submit"
          >
            Upload Soal
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Create
