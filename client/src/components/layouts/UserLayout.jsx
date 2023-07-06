import { useDispatch, useSelector } from 'react-redux'
import { Waveform } from '@uiball/loaders'
import { useEffect } from 'react'

import { Avatar, Button, Container, Section } from '../atoms'
import { openDialog } from '../../store/features/dialogSlice'
import { useLogoutMutation } from '../../store/api/authApi'
import { useGetUserQuery } from '../../store/api/userApi'

import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { HiBookmark, HiHeart, HiSquares2X2 } from 'react-icons/hi2'
import { Tab } from '../molecules'

const UserLayout = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.auth.userInfo)
  const path = window.location.pathname.split('/').pop()

  const [logout, { isSuccess: isSuccessLogout }] = useLogoutMutation()
  const { data: user, isSuccess: isSuccessUserFetch } = useGetUserQuery(userId)

  useEffect(() => {
    if (isSuccessLogout) navigate('/login', { replace: true })
  }, [isSuccessLogout])

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

  if (!isSuccessUserFetch) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
      </div>
    )
  }

  return (
    <Section className="min-h-[calc(100vh-100px)] py-[40px] xl:py-[60px]" title={user.data?.username}>
      <Container className="flex flex-col items-center gap-5 md:gap-8">
        <Avatar
          alt={user.data?.username}
          src={user.data?.photo}
          provider={user.data?.provider}
          size="md:h-28 md:w-28 h-24 w-24"
        />
        <h3 className="text-xl font-semibold text-font md:text-2xl">{user.data?.username}</h3>
        {userId === userLogin._id && (
          <div className="flex w-8/12 items-center gap-4 md:w-[30%] md:gap-5">
            <Button className="flex-1 bg-white" variant="outline">
              Ubah Profil
            </Button>
            <Button className="flex-1" variant="danger" onClick={handleLogout}>
              Keluar
            </Button>
          </div>
        )}
      </Container>
      <Container className="mt-10 flex flex-col gap-8 md:mt-16">
        <div className="flex">
          <Tab href={`/user/${userId}`} active={path === userId}>
            <HiSquares2X2 className="text-base md:text-xl xl:text-2xl" />
            <span className="hidden font-semibold md:block md:text-sm xl:text-base">Semua Soal</span>
          </Tab>
          <Tab href={`/user/${userId}/like`} active={path === 'like'}>
            <HiHeart className="text-base md:text-xl xl:text-2xl" />
            <span className="hidden font-semibold md:block md:text-sm xl:text-base">Soal yang disukai</span>
          </Tab>
          <Tab href={`/user/${userId}/save`} active={path === 'save'}>
            <HiBookmark className="text-base md:text-xl xl:text-2xl" />
            <span className="hidden font-semibold md:block md:text-sm xl:text-base">Soal yang disimpan</span>
          </Tab>
        </div>
        <Outlet />
      </Container>
    </Section>
  )
}

export default UserLayout
