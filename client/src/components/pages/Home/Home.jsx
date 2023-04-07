import { useEffect } from 'react'
import { useFetch } from '../../../hooks'
import { Post } from '../../common/organism'
import { Button } from '../../common'
import { AddPostBg } from '../../../assets'
const Home = () => {
  const { data, error, loading } = useFetch('/questions')
  useEffect(() => {
    document.title = 'BSU ~ Home'
  }, [])

  let content
  if (loading) {
    content = <div>Loading...</div>
  } else if (error) {
    content = <div>{error}</div>
  } else if (data) {
    content = data.data.map((post) => <Post key={post._id} post={post} />)
  }

  const fakultas = [
    'Ilmu Komputer',
    'Ekonomi',
    'Pertanian',
    'Sastra',
    'Teknik',
    'Hukum',
    'Filsafat',
    'Keguruan & Ilmu Pendidikan'
  ]

  // console.log({ data: data.data })

  return (
    <section className="flex min-h-[calc(100vh-80px)] justify-between bg-slate-100">
      <div className="container mx-auto flex gap-16 py-[60px]">
        {/* <div className="sticky top-[calc(80px+80px)] h-20 flex-1">
          <div className="flex flex-col gap-8">
            <h1 className="text-xl font-bold">Fakultas</h1>
            <div className="flex flex-col gap-5">
              {fakultas.map((item) => (
                <div className="flex items-center justify-between font-medium" key={item}>
                  <span className="cursor-pointer text-font/90 hover:text-primary">{item}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <div className="flex flex-[2.3] flex-col gap-8">{content}</div>
        <div className="sticky top-[calc(80px+80px)] h-fit flex-1 overflow-hidden rounded-lg bg-white font-source">
          <div className="relative flex flex-col justify-between gap-5 bg-primary p-5">
            <h1 className="text-center text-lg font-bold text-white">Ayo tambahkan soal yang kamu punya!</h1>
            <img src={AddPostBg} alt="add-post-bg" className="z-10 w-full" />
            <Button className="bg-white px-6 text-primary hover:bg-slate-200">Tambahkan Soal</Button>
            <div className="absolute left-1/2 top-1/2 z-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[50px]"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
