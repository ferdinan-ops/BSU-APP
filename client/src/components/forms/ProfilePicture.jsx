import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Avatar } from '../atoms'
import { HiCamera } from 'react-icons/hi2'
import { useRef } from 'react'

const ProfilePicture = () => {
  const user = useSelector((state) => state.auth.userInfo)

  const hiddenInputRef = useRef(null)
  const { register, watch } = useFormContext()
  const { ref: registerRef, ...rest } = register('photo')
  const photo = watch('photo')

  const onUpload = () => {
    hiddenInputRef.current.click()
  }

  return (
    <div className="group relative mx-auto h-24 w-24 cursor-pointer overflow-hidden rounded-full">
      <Avatar
        update
        src={photo?.length > 0 ? URL.createObjectURL(photo[0]) : user.photo}
        alt={user.username}
        size="h-24 w-24 mx-auto"
      />
      <div
        className="absolute inset-0 flex bg-gray-900/75 opacity-0 transition-all group-hover:opacity-100"
        onClick={onUpload}
      >
        <HiCamera className="z-50 m-auto text-3xl text-white" />
      </div>
      <input
        type="file"
        {...rest}
        ref={(e) => {
          registerRef(e)
          hiddenInputRef.current = e
        }}
        accept="image/*"
        hidden
      />
    </div>
  )
}

export default ProfilePicture
