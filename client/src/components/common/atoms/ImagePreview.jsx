import { HiXMark } from 'react-icons/hi2'

const ImagePreview = ({ onShow, image }) => {
  return (
    <div className="fixed inset-0 z-[99999999999999] flex bg-black/70">
      <HiXMark className="absolute right-4 top-4 cursor-pointer text-4xl text-white" onClick={onShow} />
      <img src={image} alt="preview" className="m-auto h-[90%]" />
    </div>
  )
}

export default ImagePreview
