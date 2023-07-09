import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import { Button, Section, Input, Dropdown, DropZone } from '../components'
import { useCreateQuestionMutation } from '../store/api/questionApi'
import { categoriesList, semesterList } from '../constants/listData'
import { questionSchema } from '../validations/question.validation'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openDialog } from '../store/features/dialogSlice'

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(questionSchema)
  })

  const { handleSubmit, reset } = methods
  const [create, { isLoading, isSuccess }] = useCreateQuestionMutation()

  useEffect(() => {
    if (isSuccess) reset()
  }, [isLoading])

  const onSubmit = async (data) => {
    const newData = new FormData()
    newData.append('mataKuliah', data.mataKuliah)
    newData.append('fakultas', data.fakultas)
    newData.append('programStudi', data.programStudi)
    newData.append('tahunAjaran', data.tahunAjaran)
    newData.append('semester', data.semester.value)
    newData.append('kategori', data.kategori.value)
    newData.append('dosen', data.dosen)
    data.images.forEach((image) => {
      newData.append('images', image)
    })

    await create(newData).unwrap()
    dispatch(
      openDialog({
        title: 'Berhasil Upload Soal',
        content:
          'Soal yang kamu berikan telah berhasil kami proses dan upload, terima kasih sudah berkontribusi pada web ini',
        buttonText: 'Kembali ke Beranda',
        variant: 'success',
        handler: () => navigate('/')
      })
    )
  }

  return (
    <Section title="Upload Soal" className="container mx-auto w-full px-[18px] py-[40px] xl:px-0 xl:py-[60px]">
      <div className="mx-auto w-full md:w-10/12 xl:w-8/12">
        <h1 className="text-center text-xl font-bold uppercase md:text-[32px]">UPLOAD SOAL YANG KAMU PUNYA</h1>
        <FormProvider {...methods}>
          <form className="mt-[40px] flex flex-col gap-6 md:mt-[60px] xl:gap-8" onSubmit={handleSubmit(onSubmit)}>
            <Input id="mataKuliah" label="Mata Kuliah" placeholder="Matematika Diskrit" />
            <Input label="Fakultas" id="fakultas" placeholder="Ilmu Komputer" />
            <Input label="Program Studi" id="programStudi" placeholder="Teknik Informatika" />
            <Input label="Nama Dosen" id="dosen" placeholder="Budi Harianja, S.Kom, M.Kom" />
            <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-5">
              <Input id="tahunAjaran" label="Tahun Ajaran" placeholder="2020/2021" />
              <Dropdown id="semester" label="Semester" options={semesterList} placeholder={semesterList[0]} />
              <Dropdown id="kategori" label="Kategori" options={categoriesList} placeholder={categoriesList[0]} />
            </div>
            <DropZone
              id="images"
              label="Upload foto soal (maks.5 foto)"
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              maxFiles={5}
            />
            <Button
              variant="primary"
              className="ml-auto w-fit px-4 shadow-button md:px-6"
              type="submit"
              loading={isLoading}
            >
              Upload Soal
            </Button>
          </form>
        </FormProvider>
      </div>
    </Section>
  )
}

export default Create
