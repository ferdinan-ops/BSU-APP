import { useRef, useState } from 'react'
import { ImagePreview, Label } from '../atoms'
import { toast } from 'react-hot-toast'
import { HiOutlineEye, HiTrash } from 'react-icons/hi'
import { BiImageAdd, BiImageAlt } from 'react-icons/bi'
import CONFIG from '../../../constants/environtment'

const formats = ['jpg', 'png', 'jpeg']

const Upload = ({ setImg, error, img }) => {
  const [isShowImage, setIsShowImage] = useState(false)
  const ref = useRef(null)

  const handleValidation = (files) => {
    if (files.length > 4 || img.length > 4) {
      toast.error('Maksimal hanya sebanyak 4 Gambar')
      return false
    }

    const checkFormats = files.some(
      (file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLocaleLowerCase()))
    )
    if (checkFormats) {
      toast.error(`Format file hanya ${formats.join(', ')}`)
      return false
    }
    return true
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    const images = Array.from(files)
    const isValid = handleValidation(images)
    if (!isValid) return toast.error('Format file hanya jpg, png, jpeg')
    setImg([...img, ...files])
  }

  const handleChange = (e) => {
    const images = Array.from(e.target.files)
    const isValid = handleValidation(images)
    if (!isValid) return toast.error('Format file hanya jpg, png, jpeg')
    setImg([...img, ...e.target.files])
  }

  const deleteImage = (id) => {
    const newImages = Array.from(img).filter((image, index) => index !== id)
    setImg(newImages)
  }

  const inputOnClick = () => ref.current.click()

  return (
    <div className="flex flex-col gap-2 xl:gap-4">
      <Label>Upload Gambar (maks.4)</Label>
      <input type="file" id="images" multiple hidden ref={ref} onChange={handleChange} accept="images/*" />
      <div
        className={`flex min-h-[200px] w-full cursor-pointer rounded-lg border-2 border-dashed p-4 ${
          error ? 'border-red-400' : 'border-slate-300'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={inputOnClick}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <BiImageAdd className="flex text-6xl text-slate-500 md:text-7xl" />
          <span className="mt-3 text-center text-sm text-slate-500 md:text-base">
            Taruk dan jatuhkan gambar di sini, atau klik untuk memilih gambar
          </span>
          <p className="mt-1 text-xs text-slate-500 md:text-sm">File yang didukung {formats.join(', ')} </p>
        </div>
      </div>
      {(Array.from(img).length > 0 || !img) && (
        <div className="mt-3 flex w-full flex-col gap-3">
          {Array.from(img).map((image, id) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border border-slate-300 py-2.5 pl-4 pr-5"
            >
              <div className="flex items-center gap-2">
                <BiImageAlt className="text-2xl text-slate-500" />
                <span className="truncate-1 text-sm text-slate-500">{image.name || image}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                  onClick={() => setIsShowImage(image.name ? URL.createObjectURL(image) : CONFIG.imageUrl + image)}
                >
                  <HiOutlineEye className="m-auto text-xl text-slate-500" />
                </div>
                <div
                  className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                  onClick={() => deleteImage(id)}
                >
                  <HiTrash className="m-auto text-xl text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <span className="-mt-1 text-xs text-red-400 xl:text-sm">{error}</span>}
      {isShowImage && <ImagePreview onShow={() => setIsShowImage(false)} image={isShowImage} />}
    </div>
  )
}

export default Upload
