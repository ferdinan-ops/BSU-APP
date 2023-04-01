import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Password, Input, Button } from '../components'
import { useAuthContext } from '../context/authContext'
import { useGoogleLogin } from '@react-oauth/google'
import * as axiosPublic from '../utils/axiosPublic'
import { Logo, LogoWhite } from '../assets'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthContext()

  useEffect(() => {
    document.title = 'BSU ~ Login'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { data } = await axiosPublic.login({ email, password })
      login(data.accessToken)
      toast.success('Berhasil Login')
      setIsLoading(false)
      navigate('/home', { state: { from: location }, replace: true })
    } catch (error) {
      console.log({ error })
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        const { data } = await axiosPublic.loginWithGoogleCustom({ accessToken: res.access_token })
        login(data.accessToken)
        toast.success('Berhasil Login')
        navigate('/home', { state: { from: location }, replace: true })
      } catch (error) {
        console.log({ error })
      }
    }
  })

  return (
    <section className="flex xl:max-h-screen relative flex-row-reverse text-font xl:px-0 xl:py-0 py-[40px] px-[18px]">
      <div className="flex-1 flex relative items-center justify-center flex-col xl:flex-row">
        <div className="static mb-[60px] flex-col xl:hidden top-8 z-50 left-8 font-source flex items-center gap-4">
          <img src={Logo} alt="logo-white" className="w-8 h-8" />
          <span className="text-font font-semibold text-xl">BSU (Bank Soal Unika)</span>
        </div>

        <div className="xl:w-[55%] font-poppins flex flex-col gap-9 xl:gap-10 w-full">
          <div className="flex gap-2 flex-col">
            <h1 className="text-[28px] xl:text-[36px] font-semibold">Masuk</h1>
            <p className="text-font/50 text-[15px] xl:text-sm font-medium">
              Selamat datang di BSU, silahkan isi data yang diperlukan untuk bisa masuk ke aplikasi
            </p>
          </div>

          <button
            className="flex gap-5 shadow-md rounded py-5 justify-center font-medium bg-slate-100 hover:bg-slate-200"
            onClick={() => handleLoginWithGoogle()}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-font">Masuk dengan Google</span>
          </button>
          <div className="flex gap-5 items-center text-[13px] xl:text-sm">
            <span className="border border-[#DFDFDF] h-[2px] w-full"></span>
            <span className="text-[#ACADAC] min-w-max">Atau login dengan</span>
            <span className="border border-[#DFDFDF] h-[2px] w-full"></span>
          </div>

          <form className="flex flex-col gap-8 xl:gap-7" onSubmit={handleSubmit}>
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Password value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" isLoading={isLoading}>
              Masuk
            </Button>
          </form>

          <div className="text-center font-semibold text-font text-sm xl:text-base">
            <span>Belum punya akun? </span>
            <Link to="/register" className="text-primary">
              Daftar sekarang, gratis!
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:flex hidden min-h-screen">
        <div className="mb-[60px] absolute top-8 z-50 left-8 font-source flex items-center gap-4">
          <img src={LogoWhite} alt="logo-white" className="w-8 h-8" />
          <span className="text-white font-semibold text-xl">BSU (Bank Soal Unika)</span>
        </div>
        <img src="https://source.unsplash.com/random/?campus" alt="" className="w-full object-cover brightness-50" />
      </div>
    </section>
  )
}

export default Login
