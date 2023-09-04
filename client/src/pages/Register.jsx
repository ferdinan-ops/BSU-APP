import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

import { registerValidation } from '../validations/auth.validation'
import { Button, Input, Password, Section } from '../components'
import { useRegisterMutation } from '../store/api/authApi'

const Register = () => {
  const navigate = useNavigate()
  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation()

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation)
  })
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (isSuccess) {
      reset()
<<<<<<< HEAD
      navigate('/login')
=======
      navigate('/')
>>>>>>> 5d1be214b8273c62b6e84deee237bb7e0bbf953c
      toast.success('Berhasil Terdaftar')
    }
    if (isError) toast.error(error.data.error)
  }, [isLoading])

  const handleRegister = (values) => {
    const { confirmPassword, ...rest } = values
    register(rest)
  }

  return (
    <Section className="gap-7 xl:w-[55%] xl:gap-8" title="Daftar">
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold xl:text-[36px]">Daftar</h1>
        <p className="text-sm font-medium text-font/50 xl:text-[15px]">
          Silahkan isi data yang diperlukan dibawah ini untuk membuat akun
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-4 xl:gap-5" onSubmit={handleSubmit(handleRegister)}>
          <Input id="username" label="Username" placeholder="John Doe" />
          <Input id="email" label="Email" placeholder="name@email.com" />
          <Password id="password" label="Password" />
          <Password id="confirmPassword" label="Konfirmasi Kata Sandi" />
          <Button variant="primary" loading={isLoading}>
            Daftar
          </Button>
        </form>
      </FormProvider>

      <div className="text-center text-sm font-semibold text-font xl:text-base">
        <span>Sudah punya akun? Ayo </span>
        <Link to="/login" className="text-primary hover:underline">
          Masuk!
        </Link>
      </div>
    </Section>
  )
}

export default Register
