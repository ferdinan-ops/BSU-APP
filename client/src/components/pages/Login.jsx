import { Password, Input, Button } from '../common'
import { useAuthContext } from '../../context/authContext'
import { useGoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, LogoWhite } from '../../assets'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login, loginWithGoogleCustom } = useAuthContext()

  useEffect(() => {
    document.title = 'BSU ~ Login'
  }, [])

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await login({ email, password })
      toast.success('Berhasil Login')
      setIsLoading(false)
      navigate('/home')
    } catch (error) {
      console.log({ error })
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        await loginWithGoogleCustom({ accessToken: res.access_token })
        toast.success('Berhasil Login')
        navigate('/home')
      } catch (error) {
        console.log({ error })
      }
    }
  })

  return (
    <section className="flex xl:max-h-screen relative flex-row-reverse text-font xl:px-0 xl:py-0 py-[40px] px-[18px]">
      <div className="flex-1 flex relative items-center justify-center flex-col xl:flex-row">
        <div className="static mb-[40px] flex-col xl:hidden top-8 z-50 left-8 font-source flex items-center gap-3 xl:gap-4">
          <img src={Logo} alt="logo-white" className="xl:w-8 xl:h-8 w-7 h-7" />
          <span className="font-semibold text-lg xl:text-xl">BSU (Bank Soal Unika)</span>
        </div>

        <div className="xl:w-[55%] font-poppins flex flex-col gap-9 xl:gap-10 w-full">
          <div className="flex gap-2 flex-col">
            <h1 className="text-[28px] xl:text-[36px] font-semibold">Masuk</h1>
            <p className="text-font/50 text-[15px] xl:text-sm font-medium">
              Selamat datang di BSU, silahkan isi data yang diperlukan untuk bisa masuk ke aplikasi
            </p>
          </div>

          <Button className="gap-5 border border-slate-300 hover:bg-slate-100" onClick={() => handleLoginWithGoogle()}>
            <FcGoogle className="xl:text-2xl text-[22px]" />
            <span className="text-slate-500">Masuk dengan Google</span>
          </Button>

          <div className="flex gap-5 items-center text-[13px] xl:text-sm">
            <span className="border border-[#DFDFDF] h-[2px] w-full"></span>
            <span className="text-[#ACADAC] min-w-max font-medium">Atau masuk dengan</span>
            <span className="border border-[#DFDFDF] h-[2px] w-full"></span>
          </div>

          <form className="flex flex-col gap-8 xl:gap-7" onSubmit={handleSubmit}>
            <Input label="Email" type="email" placeholder="name@email.com" value={email} onChange={handleEmail} />
            <Password placeholder="********" value={password} onChange={handlePassword} />
            <Button
              className="bg-primary shadow-button hover:bg-primary-hover disabled:bg-primary/60"
              isLoading={isLoading}
            >
              Masuk
            </Button>
          </form>

          <div className="text-center font-semibold text-sm xl:text-base">
            <span>Belum punya akun? </span>
            <Link to="/register" className="text-primary">
              Daftar sekarang, gratis!
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:flex hidden min-h-screen bg-font">
        <div className="mb-[60px] absolute top-8 z-50 left-8 font-source flex items-center gap-4">
          <img src={LogoWhite} alt="logo-white" className="w-8 h-8" />
          <span className="text-white font-semibold text-xl">BSU (Bank Soal Unika)</span>
        </div>
        {/* <img src="https://source.unsplash.com/random/?campus" alt="" className="w-full object-cover brightness-50" /> */}
      </div>
    </section>
  )
}

export default Login
