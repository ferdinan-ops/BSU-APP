import { HiXMark } from 'react-icons/hi2'
import Icon from './Icon'

const ImagePreview = ({ onShow, image }) => {
  return (
    <div className="fixed inset-0 z-[99999999999999] flex bg-black/70">
      <Icon className="absolute right-4 top-4 h-10 w-10 bg-white/25 hover:bg-white/10 sm:h-11 sm:w-11">
        <HiXMark className="m-auto text-3xl text-white md:text-4xl" onClick={onShow} />
      </Icon>
      <img src={image} alt="preview" className="m-auto w-full px-6 sm:h-[90%] sm:w-auto md:px-0" />
    </div>
  )
}

export default ImagePreview
