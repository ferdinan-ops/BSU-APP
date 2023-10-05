import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import Label from './Label'
import clsx from 'clsx'
import { BiImageAdd, BiImageAlt } from 'react-icons/bi'
import { HiOutlineEye, HiTrash } from 'react-icons/hi'
import { ImagePreview } from '../atoms'
import CONFIG from '../../constants/environtment'
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll'

const DropZone = ({ accept, id, label, maxFiles }) => {
  const [isShowImage, setIsShowImage] = useState(false)
  const { register, setValue, setError, clearErrors, watch, formState } = useFormContext()
  const { errors } = formState
  const files = watch(id)

  useDisableBodyScroll(isShowImage)

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, [])
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message
        })
      } else {
        setValue(id, acceptedFiles, { shouldValidate: true })
        clearErrors(id)
      }
    },
    [id, setValue, setError, clearErrors]
  )

  const deleteFile = (e, file) => {
    e.preventDefault()
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)

    if (newFiles.length > 0) {
      setValue(id, newFiles)
    } else {
      setValue(id, [])
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    maxFiles
  })

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative" {...getRootProps()}>
        <input {...register(id)} id={id} {...getInputProps()} />
        <div
          className={clsx(
            'flex min-h-[200px] w-full cursor-pointer rounded-lg border-2 border-dashed p-4',
            errors[id] ? 'border-red-400' : 'border-slate-300'
          )}
        >
          <div className="flex w-full flex-col items-center justify-center">
            <BiImageAdd className="flex text-6xl text-slate-500 md:text-7xl" />
            <span className="mt-3 text-center text-sm text-slate-500 md:text-base">
              Taruk dan jatuhkan gambar di sini, atau klik untuk memilih gambar
            </span>
            {/* <p className="mt-1 text-xs text-slate-500 md:text-sm">File yang didukung {accept.join(', ')} </p> */}
          </div>
        </div>
      </div>
      {!!files?.length && (
        <div className="mt-3 flex w-full flex-col gap-3">
          {files.map((file, id) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border border-slate-300 py-2.5 pl-4 pr-5"
            >
              <div className="flex items-center gap-2">
                <BiImageAlt className="text-2xl text-slate-500" />
                <span className="truncate-1 text-sm text-slate-500">{file?.name || file}</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                  onClick={() => setIsShowImage(file.name ? URL.createObjectURL(file) : CONFIG.imageUrl + file)}
                >
                  <HiOutlineEye className="m-auto text-xl text-slate-500" />
                </div>
                <div
                  className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                  onClick={(e) => deleteFile(e, file)}
                >
                  <HiTrash className="m-auto text-xl text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {errors[id] && <span className="-mt-1 text-xs text-red-400 xl:text-sm ">{errors[id].message.toString()}</span>}
      {isShowImage && <ImagePreview onShow={() => setIsShowImage(false)} image={isShowImage} />}
    </div>
  )
}

export default DropZone
