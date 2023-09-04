import { registerInitialValues, registerValidation } from '../validations/auth.validation'
import { Button, Password, TextField } from '../components/common'
import { register } from '../store/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register: state } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'BSU ~ Daftar'
  }, [])

  const handleSubmit = async (values) => {
    const { username, email, password } = values
    try {
      await dispatch(register({ username, email, password })).unwrap()
      toast.success('Anda berhasil Terdaftar, silahkan login')
      navigate('/login')
    } catch (error) {
      toast.error(error.error)
    }
  }

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidation,
    onSubmit: handleSubmit
  })

  return (
    <div className="flex w-full flex-col gap-7 font-source xl:w-[55%] xl:gap-8">
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold xl:text-[36px]">Daftar</h1>
        <p className="text-sm font-medium text-font/50 xl:text-[15px]">
          Silahkan isi data yang diperlukan dibawah ini untuk membuat akun
        </p>
      </div>

      <form className="flex flex-col gap-5 xl:gap-6 " onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="John Doe"
          label="Username"
          type="text"
          name="username"
          error={formik.touched.username && formik.errors.username && formik.errors.username}
          {...formik.getFieldProps('username')}
        />
        <TextField
          placeholder="name@email.com"
          label="Email"
          type="email"
          name="email"
          error={formik.touched.email && formik.errors.email && formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <Password
          label="Kata Sandi"
          name="password"
          error={formik.touched.password && formik.errors.password && formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        <Password
          label="Konfirmasi Kata Sandi"
          name="confirmPassword"
          error={formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword}
          {...formik.getFieldProps('confirmPassword')}
        />
        <Button
          isLoading={state.loading}
          className="bg-primary font-semibold text-white hover:bg-primary-hover disabled:bg-primary/60 xl:text-base"
        >
          Daftar
        </Button>
      </form>

      <div className="text-center text-sm font-semibold text-font xl:text-base">
        <span>Sudah punya akun? Ayo </span>
        <Link to="/login" className="text-primary hover:underline">
          Masuk!
        </Link>
      </div>
    </div>
  )
}

export default Register
