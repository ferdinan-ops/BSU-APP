import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Button } from '../components'
import { useLogoutMutation } from '../store/api/authApi'
import { useEffect } from 'react'
import { openDialog } from '../store/features/dialogSlice'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logout, { isSuccess }] = useLogoutMutation()
  const user = useSelector((state) => state.auth.userInfo)

  useEffect(() => {
    if (isSuccess) navigate('/login', { replace: true })
  }, [isSuccess])

  const handleLogout = () => {
    dispatch(
      openDialog({
        isOpen: true,
        title: 'Keluar',
        content: 'Apakah Anda yakin ingin keluar? Anda akan diarahkan ke halaman login.',
        buttonText: 'Keluar',
        variant: 'danger',
        handler: () => logout()
      })
    )
  }

  return (
    <section className="container mx-auto w-full px-[18px] py-[40px] font-source xl:px-0 xl:py-[60px]">
      <div className="flex flex-col items-center gap-8">
        <Avatar alt={user.username} src={user.photo} provider={user.provider} size="h-28 w-28 border-2" />
        <h3 className="text-2xl font-semibold text-font">{user.username}</h3>
        <div className="flex w-[30%] items-center gap-5">
          <Button className="flex-1" variant="outline">
            Ubah Profil
          </Button>
          <Button className="flex-1" variant="danger" onClick={handleLogout}>
            Keluar
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Profile
