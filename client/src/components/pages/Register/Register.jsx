import { register } from '../../../store/features/authSlice'
import { Button, Password, TextField } from '../../common'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

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
    <div className="flex w-full flex-col gap-9 font-poppins xl:w-[55%] xl:gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-semibold xl:text-[36px]">Daftar</h1>
        <p className="text-sm font-medium text-font/50 xl:text-[15px]">
          Silahkan isi data yang diperlukan dibawah ini untuk membuat akun BSU Anda
        </p>
      </div>

      <form className="flex flex-col gap-8 xl:gap-7" onSubmit={handleSubmit}>
        <TextField placeholder="John Doe" label="Username" type="text" value={username} onChange={handleUsername} />
        <TextField placeholder="name@email.com" label="Email" type="email" value={email} onChange={handleEmail} />
        <Password label="Kata Sandi" value={password} onChange={handlePassword} />
        <Button className="bg-primary text-white hover:bg-primary-hover disabled:bg-primary/60" isLoading={loading}>
          Daftar
        </Button>
      </form>

      <div className="text-center text-sm font-semibold text-font xl:text-base">
        <span>Sudah punya akun? </span>
        <Link to="/login" className="text-primary hover:underline">
          Login!
        </Link>
      </div>
    </div>
  )
}

export default Register
