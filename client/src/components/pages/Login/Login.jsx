import { login, loginWithGoogleCustom } from '../../../store/features/authSlice'
import { Password, Button, TextField, Checkbox } from '../../common'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'BSU ~ Masuk'
  }, [])

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ email, password })).unwrap()
      navigate('/')
      toast.success('Berhasil Login')
    } catch (err) {
      toast.error(err.error)
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      const { access_token: accessToken } = res
      dispatch(loginWithGoogleCustom({ accessToken }))
      navigate('/')
      toast.success('Berhasil Login')
    }
  })

  return (
    <div className="flex w-full flex-col gap-9 font-poppins xl:w-[55%] xl:gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-semibold xl:text-[36px]">Masuk</h1>
        <p className="text-[15px] font-medium text-font/50 xl:text-sm">
          Selamat datang di BSU, silahkan isi data yang diperlukan untuk bisa masuk ke aplikasi
        </p>
      </div>

      <form className="flex flex-col gap-5 xl:gap-6" onSubmit={handleSubmit}>
        <TextField label="Email" type="email" placeholder="name@email.com" value={email} onChange={handleEmail} />
        <Password label="Kata Sandi" value={password} onChange={handlePassword} />
        <div className="flex items-center justify-between font-semibold tracking-wide ">
          <Checkbox label="Ingat Saya" />
          <Link to="/login" className="text-[13px] text-primary xl:text-sm">
            Lupa Password?
          </Link>
        </div>
        <Button
          className="bg-primary font-semibold text-white hover:bg-primary-hover disabled:bg-primary/60 xl:text-base"
          isLoading={loading}
        >
          Masuk
        </Button>
      </form>

      <Button
        className="-mt-6 gap-5 border border-slate-300 font-semibold hover:bg-slate-100 xl:text-base"
        onClick={() => handleLoginWithGoogle()}
      >
        <FcGoogle className="text-[22px] xl:text-2xl" />
        <span className="text-font">Masuk dengan Google</span>
      </Button>

      <div className="text-center text-sm font-semibold xl:text-base">
        <span>Belum punya akun? </span>
        <Link to="/register" className="text-primary hover:underline">
          Daftar sekarang, gratis!
        </Link>
      </div>
    </div>
  )
}

export default Login
