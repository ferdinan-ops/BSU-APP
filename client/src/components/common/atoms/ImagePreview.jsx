import { HiXMark } from 'react-icons/hi2'

const ImagePreview = ({ onShow, image }) => {
  return (
    <div className="fixed inset-0 z-[99999999999999] flex bg-black/70">
      <div className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer rounded-full bg-white/30 md:h-11 md:w-11">
        <HiXMark className="m-auto text-3xl text-white md:text-4xl" onClick={onShow} />
      </div>
      <img src={image} alt="preview" className="m-auto w-full px-6 md:h-[90%] md:w-auto md:px-0" />
    </div>
  )
}

export default ImagePreview
