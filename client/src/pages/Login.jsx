import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

import { useLoginMutation, useLoginWithGoogleCustomMutation } from '../store/api/authApi'
import { Button, Input, Password, Section } from '../components'
import { loginValidation } from '../validations/auth.validation'
import { setUserInfo } from '../store/features/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation)
  })
  const { handleSubmit, reset } = methods

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()
  const [loginWithGoogleCustom, { isSuccess: isSuccessGoogle, isLoading: isLoadingGoogle }] =
    useLoginWithGoogleCustomMutation()

  useEffect(() => {
    if (isSuccess || isSuccessGoogle) {
      reset()
      navigate('/')
      toast.success('Berhasil Login')
    }
    if (isError) toast.error(error.data.error)
  }, [isLoading, isLoadingGoogle])

  const handleLoginLocal = async (values) => {
    const data = await login(values).unwrap()
    dispatch(setUserInfo(data))
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const { access_token: accessToken } = res
      const data = await loginWithGoogleCustom({ accessToken }).unwrap()
      dispatch(setUserInfo(data))
    }
  })

  return (
    <Section className="gap-7 xl:w-[55%] xl:gap-8" title="Masuk">
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold xl:text-[36px]">Masuk</h1>
        <p className="text-[15px] font-medium text-font/60 xl:text-sm">
          Selamat datang di BSU, silahkan isi data yang diperlukan untuk bisa masuk ke aplikasi
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 xl:gap-5" onSubmit={handleSubmit(handleLoginLocal)}>
          <Input id="email" label="Email" placeholder="name@email.com" />
          <Password id="password" label="Kata Sandi" />
          <Button disabled={isLoading} variant="primary">
            Masuk
          </Button>
        </form>
      </FormProvider>

      <Button className="-mt-4 gap-5 border border-slate-300 hover:bg-slate-100" onClick={handleLoginWithGoogle}>
        <FcGoogle className="text-[22px] xl:text-2xl" />
        <span className="text-font">Masuk dengan Google</span>
      </Button>

      <div className="text-center text-sm font-semibold xl:text-base">
        <span>Belum punya akun? </span>
        <Link to="/register" className="text-primary hover:underline">
          Daftar sekarang, gratis!
        </Link>
      </div>
    </Section>
  )
}

export default Login
