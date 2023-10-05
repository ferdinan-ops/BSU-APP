import { useDispatch, useSelector } from 'react-redux'
import { HiX } from 'react-icons/hi'
import { useEffect } from 'react'
import clsx from 'clsx'

import { useUpdateUserDataMutation } from '../../store/api/userApi'
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll'
import { FormProvider, useForm } from 'react-hook-form'
import { Input, ProfilePicture } from '../forms'
import { Button, Icon } from '../atoms'
import { updateUserInfo } from '../../store/features/authSlice'

const Modal = ({ setIsShow, isShow }) => {
  const methods = useForm()
  const dispatch = useDispatch()
  const { handleSubmit, setValue } = methods
  const user = useSelector((state) => state.auth.userInfo)
  const [update, { isSuccess, isLoading }] = useUpdateUserDataMutation()

  useDisableBodyScroll(isShow)

  useEffect(() => {
    setValue('username', user.username)
  }, [])

  useEffect(() => {
    if (isSuccess) setIsShow(false)
  }, [isLoading])

  const onSubmit = async (data) => {
    const newData = new FormData()
    if (data.photo?.length > 0) newData.append('photo', data.photo[0])
    newData.append('username', data.username)
    const { data: result } = await update(newData).unwrap()
    dispatch(updateUserInfo(result))
    setIsShow(false)
  }

  const closeModal = () => {
    setIsShow(false)
  }

  return (
    <section
      className={clsx(
        'visible fixed inset-0 z-[9999999] flex items-center justify-center p-4 px-[18px] transition-colors md:px-0',
        isShow ? 'visible bg-gray-900/75' : 'invisible'
      )}
    >
      <article
        className={clsx(
          'w-full overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 md:max-w-[486px]',
          isShow ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-b-2 p-4">
          <h3 className="text-base font-bold leading-6 text-font md:text-lg">Ubah Profil</h3>
          <Icon className="h-9 w-9 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={closeModal}>
            <HiX className="text-lg text-font" />
          </Icon>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-4">
            <ProfilePicture />
            <Input id="username" label="Username" />
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" className="px-6 md:w-fit md:text-[13px]" onClick={closeModal}>
                Batal
              </Button>
              <Button variant="primary" className="px-6 md:w-fit md:text-[13px]" type="submit" loading={isLoading}>
                Simpan
              </Button>
            </div>
          </form>
        </FormProvider>
      </article>
    </section>
  )
}

export default Modal
