import { Link } from 'react-router-dom'
import { Logo } from '../../assets/'
import { Button, Input, Password } from '../common'
import { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (e) => setUsername(e.event.target)
  const handleEmail = (e) => setEmail(e.event.target)
  const handlePassword = (e) => setPassword(e.event.target)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <section className="flex xl:max-h-screen relative text-font xl:px-0 xl:py-0 py-[40px] px-[18px]">
      <div className="flex-1 flex relative items-center justify-center flex-col xl:flex-row">
        <div className="static mb-[40px] flex-col xl:hidden top-8 z-50 left-8 font-source flex items-center gap-3 xl:gap-4">
          <img src={Logo} alt="logo-white" className="xl:w-8 xl:h-8 w-7 h-7" />
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
            <Button className="bg-primary shadow-button hover:bg-primary-hover disabled:bg-primary/60">Daftar</Button>
          </form>

          <div className="text-center font-semibold text-font text-sm xl:text-base">
            <span>Sudah punya akun? </span>
            <Link to="/login" className="text-primary">
              Login!
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:flex hidden min-h-screen bg-font">
        {/* <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover brightness-50" /> */}
      </div>
    </section>
  )
}

export default Register
