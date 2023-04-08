import { Button, TextField, Upload } from '../../common'

const Create = () => {
  return (
    <section className="container mx-auto w-full px-[18px] py-[40px] xl:px-0 xl:py-[60px]">
      <div className="mx-auto w-full md:w-10/12 xl:w-8/12">
        <h1 className="text-center text-xl font-bold uppercase md:text-[32px]">UPLOAD SOAL YANG KAMU PUNYA 😁</h1>
        <form className="mt-[40px] flex flex-col gap-6 md:mt-[60px] xl:gap-8">
          <TextField label="Mata Kuliah" placeholder="Matematika Diskrit" />
          <TextField label="Fakultas" placeholder="Ilmu Komputer" />
          <TextField label="Program Studi" placeholder="Teknik Informatika" />
          <TextField label="Nama Dosen" placeholder="Budi Harianja, S.Kom, M.Kom" />
          <div className="flex flex-col items-center gap-6 xl:flex-row xl:gap-0">
            <div className="w-full">
              <TextField label="Tahun Ajaran" placeholder="2020/2021" />
            </div>
            <div className="w-full">
              <TextField label="Semester" placeholder="1" />
            </div>
            <div className="w-full">
              <TextField label="Kategori" placeholder="UAS" />
            </div>
          </div>
          <Upload />
          <Button className="ml-auto w-fit bg-primary px-6 font-bold text-white shadow-button hover:bg-primary-hover">
            Upload Soal
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Create
