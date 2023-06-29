import { useSwiper } from 'swiper/react'
import { Button } from '../atoms'
import { HiChevronLeft } from 'react-icons/hi2'
import clsx from 'clsx'

const CarouselButton = ({ direction }) => {
  const swiper = useSwiper()

  const handleSwiper = () => {
    if (direction === 'prev') {
      swiper.slidePrev()
    } else if (direction === 'next') {
      swiper.slideNext()
    }
  }

  return (
    <Button className="border-2 px-2 md:px-3" variant="outline" onClick={handleSwiper}>
      <HiChevronLeft className={clsx('text-base text-font md:text-xl', direction === 'next' && 'rotate-180')} />
    </Button>
  )
}

export default CarouselButton
