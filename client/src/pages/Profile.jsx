import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../components/common'
import { logout, setLogout } from '../store/features/authSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const handleLogout = async () => {
    await dispatch(logout()).unwrap()
    dispatch(setLogout())
    navigate('/login', { replace: true })
  }
  return (
    <section className="container mx-auto w-full px-[18px] py-[40px] font-source xl:px-0 xl:py-[60px]">
      <div className="flex flex-col items-center gap-8">
        <img src={userInfo.photo} alt="" className="h-28 rounded-full shadow-button" />
        <h3 className="text-2xl font-semibold text-font">{userInfo.username}</h3>
        <div className="flex w-[30%] items-center gap-5">
          <Button className="flex-1 border-2 border-slate-200 font-semibold text-font xl:text-base">Ubah Profil</Button>
          <Button className="flex-1 bg-red-500 font-semibold text-white xl:text-base" onClick={handleLogout}>
            Keluar
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Profile
