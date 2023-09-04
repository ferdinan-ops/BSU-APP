import { login, loginWithGoogleCustom, setUserInfo } from '../store/features/authSlice'
import { loginInitialValues, loginValidation } from '../validations/auth.validation'
import { Password, Button, TextField } from '../components/common'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'BSU ~ Masuk'
  }, [])

  const handleSubmit = async (values) => {
    const { email, password } = values
    try {
      const data = await dispatch(login({ email, password })).unwrap()
      dispatch(setUserInfo(data))
      navigate('/')
      toast.success('Berhasil Login')
    } catch (err) {
      toast.error(err.error)
    }
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const { access_token: accessToken } = res
      const data = await dispatch(loginWithGoogleCustom({ accessToken })).unwrap()
      dispatch(setUserInfo(data))
      navigate('/')
      toast.success('Berhasil Login')
    }
  })

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidation,
    onSubmit: handleSubmit
  })

  return (
    <div className="flex w-full flex-col gap-7 font-source xl:w-[55%] xl:gap-8">
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold xl:text-[36px]">Masuk</h1>
        <p className="text-[15px] font-medium text-font/60 xl:text-sm">
          Selamat datang di BSU, silahkan isi data yang diperlukan untuk bisa masuk ke aplikasi
        </p>
      </div>

      <form className="gap-3s flex flex-col xl:gap-4" onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          placeholder="name@email.com"
          error={formik.touched.email && formik.errors.email && formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <Password
          label="Kata Sandi"
          name="password"
          error={formik.touched.password && formik.errors.password && formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        {/* <div className="flex items-center justify-between font-semibold tracking-wide ">
          <Checkbox label="Ingat Saya" />
          <Link to="/login" className="text-[13px] text-primary xl:text-sm">
            Lupa Password?
          </Link>
        </div> */}
        <Button
          className="mt-2 bg-primary font-semibold text-white hover:bg-primary-hover disabled:bg-primary/60 xl:text-base"
          isLoading={loading}
        >
          Masuk
        </Button>
      </form>

      <Button
        className="-mt-4 gap-5 border border-slate-300 font-semibold hover:bg-slate-100 xl:text-base"
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
