import { TbPhotoPlus } from 'react-icons/tb'
import { useRef, useState } from 'react'
import { ImagePreview, Label } from '../atoms'
import { toast } from 'react-hot-toast'

const Upload = ({ img, setImg, error }) => {
  const [value, setValue] = useState([])
  const ref = useRef(null)

  const previewHandler = (images) => {
    images.forEach((image) => {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onloadend = () => {
        setValue((old) => [...old, reader.result])
      }
    })
  }

  const handleValidation = (files) => {
    if (files.length > 4 || value.length > 4) {
      toast.error('Maksimal hanya sebanyak 4 Gambar')
      return false
    }

    const formats = ['jpg', 'png', 'jpeg']
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
    setImg(files)
    const images = Array.from(files)
    const isValid = handleValidation(images)
    if (isValid) previewHandler(images)
  }

  const handleChange = (e) => {
    setImg(e.target.files)
    const images = Array.from(e.target.files)
    const isValid = handleValidation(images)
    if (isValid) previewHandler(images)
  }

  const inputOnClick = () => ref.current.click()

  return (
    <div className="flex flex-col gap-2 xl:gap-4">
      <Label>Upload Gambar (maks.4)</Label>
      <input type="file" id="images" multiple hidden ref={ref} onChange={handleChange} accept="images/*" />
      <div
        className={`flex min-h-[200px] w-full rounded-lg border-2 border-dashed p-4 ${
          error ? 'border-red-400' : 'border-slate-300'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {value.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center">
            <TbPhotoPlus className="flex text-7xl text-slate-400" />
            <span className="mt-2 font-semibold text-slate-400">
              Tarik dan jatuhkan file kesini atau tekan{' '}
              <span className="cursor-pointer text-primary underline" onClick={inputOnClick}>
                disini
              </span>
            </span>
          </div>
        ) : (
          <ImagePreview value={value} inputOnClick={inputOnClick} />
        )}
      </div>
      {error && <span className="-mt-1 text-xs text-red-400 xl:text-sm">{error}</span>}
    </div>
  )
}

export default Upload
