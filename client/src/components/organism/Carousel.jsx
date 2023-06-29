import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import CONFIG from '../../constants/environtment'
import { CarouselButton } from '../molecules'
import { HiLockClosed } from 'react-icons/hi2'
import { Button } from '../atoms'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Carousel = ({ question }) => {
  const navigate = useNavigate()
  const { _id } = useSelector((state) => state.auth.userInfo)
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
          <div className="relative">
            {_id ? (
              <img src={CONFIG.imageUrl + image} alt={`${question.data?.mataKuliah}-${index}`} className="w-full" />
            ) : (
              <div className="unauth absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-lg">
                  <HiLockClosed className="text-6xl" />
                  <h1 className="mb-5 text-center text-xl font-semibold">Login untuk melihat gambar</h1>
                  <Button onClick={() => navigate('/login')} variant="primary" className="w-full">
                    Login
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
