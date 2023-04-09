import React from 'react'
import { HiEye, HiTrash } from 'react-icons/hi'
import { TbPhotoPlus } from 'react-icons/tb'

const ImagePreview = ({ value, inputOnClick }) => {
  return (
    <div className="relative flex flex-wrap gap-5">
      {value.map((image, id) => (
        <div
          key={id}
          className="relative w-[46.8%] cursor-pointer flex-wrap overflow-hidden rounded shadow-md xl:w-[22.9%]"
        >
          <img src={image} alt="preview" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-5 bg-black/60 py-3 transition-all">
            <div className="flex h-9 w-9 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600">
              <HiEye className="m-auto text-xl text-white" />
            </div>
            <div className="flex h-9 w-9 cursor-pointer rounded-lg bg-red-500 hover:bg-red-600">
              <HiTrash className="m-auto text-xl text-white" />
            </div>
          </div>
        </div>
      ))}
      {value.length < 4 && (
        <div
          className="flex h-auto w-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-slate-300"
          onClick={inputOnClick}
        >
          <TbPhotoPlus className="text-5xl text-slate-300" />
          <span className="text-sm font-semibold text-slate-400">Tambah Gambar</span>
        </div>
      )}
    </div>
  )
}

export default ImagePreview
