import { register } from '../../../store/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Password } from '../../common'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Logo } from '../../../assets'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register: { loading }
  } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = 'BSU ~ Daftar'
  }, [])

  const handleUsername = (e) => setUsername(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(register({ username, email, password })).unwrap()
      toast.success('Anda berhasil Terdaftar, silahkan login')
      navigate('/login')
    } catch (error) {
      toast.error(error.error)
    }
  }

  return (
    <section className="flex xl:max-h-screen relative text-font xl:px-0 xl:py-0 py-[40px] px-[18px]">
      <div className="flex-1 flex relative items-center justify-center flex-col xl:flex-row">
        <div className="static mb-[40px] flex-col xl:absolute xl:flex-row top-8 z-50 left-8 font-source flex items-center gap-3">
          <img src={Logo} alt="logo-white" className="w-8 h-8" />
          <span className="font-semibold text-lg xl:text-xl">BSU (Bank Soal Unika)</span>
        </div>

        <div className="xl:w-[55%] font-poppins flex flex-col gap-9 xl:gap-10 w-full">
          <div className="flex gap-2 flex-col">
            <h1 className="text-[28px] xl:text-[36px] font-semibold">Daftar</h1>
            <p className="text-font/50 xl:text-[15px] text-sm font-medium">
              Silahkan isi data yang diperlukan dibawah ini untuk membuat akun BSU Anda
            </p>
          </div>

          <form className="flex flex-col gap-8 xl:gap-7" onSubmit={handleSubmit}>
            <Input placeholder="John Doe" label="Username" type="text" value={username} onChange={handleUsername} />
            <Input placeholder="name@email.com" label="Email" type="email" value={email} onChange={handleEmail} />
            <Password placeholder="******" isRegister value={password} onChange={handlePassword} />
            <Button
              className="bg-primary shadow-button hover:bg-primary-hover disabled:bg-primary/60"
              isLoading={loading}
            >
              Daftar
            </Button>
          </form>

          <div className="text-center font-semibold text-font text-sm xl:text-base">
            <span>Sudah punya akun? </span>
            <Link to="/login" className="text-primary">
              Login!
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:flex hidden min-h-screen">
        <img
          src="https://source.unsplash.com/random/?campus"
          alt="regis-bg"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
    </section>
  )
}

export default Register
