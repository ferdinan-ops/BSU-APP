import { useState } from 'react'
import { HiEllipsisHorizontal, HiOutlinePencil, HiOutlineTrash, HiOutlineFlag } from 'react-icons/hi2'
import { useSelector } from 'react-redux'

const More = ({ postUserId }) => {
  const [show, setShow] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <div className="relative font-source font-semibold">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-slate-200"
        onClick={() => setShow(!show)}
      >
        <HiEllipsisHorizontal className="text-2xl text-font" />
      </div>
      <ul
        className={`absolute right-0 top-full flex origin-top-right flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all ${
          show ? 'scale-100' : 'scale-0'
        }`}
      >
        {userInfo._id === postUserId ? (
          <>
            <li className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-slate-200">
              <HiOutlinePencil className="text-lg text-font" />
              <span>Ubah</span>
            </li>
            <li className="flex cursor-pointer items-center gap-4 px-4 py-2 text-red-500 hover:bg-slate-200">
              <HiOutlineTrash className="text-lg" />
              <span>Hapus</span>
            </li>
          </>
        ) : (
          <li className="flex cursor-pointer items-center gap-4 px-4 py-2 text-red-500 hover:bg-slate-200">
            <HiOutlineFlag className="text-lg" />
            <span>Laporkan</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default More
