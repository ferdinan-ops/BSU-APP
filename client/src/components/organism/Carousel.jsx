import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

import CONFIG from '../../constants/environtment'
import { CarouselButton } from '../molecules'
import { HiLockClosed } from 'react-icons/hi2'
import { Button, Icon } from '../atoms'

const Carousel = ({ question }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userInfo)
  const post = question.data

  return (
    <Swiper
      modules={[Pagination, Navigation, A11y]}
      slidesPerView={1}
      spaceBetween={40}
      grabCursor={true}
      className="w-full md:flex-1"
    >
      {question.data?.images.map((image, index) => (
        <SwiperSlide key={index} className="w-full overflow-hidden rounded-xl border-4 border-slate-200">
          <div className="relative min-h-[500px]">
            <img src={CONFIG.imageUrl + image} alt={post.mataKuliah} className={clsx('w-full', !user && 'blur-lg')} />
            {!user && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="mx-7 flex w-fit flex-col items-center rounded-xl bg-primary px-8 py-6 text-white shadow-2xl shadow-primary xl:px-14 xl:py-10">
                  <Icon className="mb-5 h-16 w-16 bg-white hover:bg-none xl:h-20 xl:w-20">
                    <HiLockClosed className="text-3xl text-font xl:text-5xl" />
                  </Icon>
                  <span className="text-center text-lg font-bold xl:text-3xl">Anda bukan pengguna BSU ?</span>
                  <p className="mt-2 text-center text-[13px] text-white/80 xl:w-10/12 xl:text-[15px]">
                    Apakah Anda ingin akses penuh? Ayo, masuk ke aplikasi dan upload soal Anda
                  </p>
                  <Button
                    variant="base"
                    className="mt-5 w-full py-3 text-base md:py-4 md:text-lg xl:mt-10"
                    onClick={() => navigate('/login')}
                  >
                    Masuk
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
      {question.data?.images.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8 md:gap-5">
          <CarouselButton direction="prev" />
          <CarouselButton direction="next" />
        </div>
      )}
    </Swiper>
  )
}

export default Carousel
