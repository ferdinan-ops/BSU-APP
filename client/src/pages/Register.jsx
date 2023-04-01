import { Link } from 'react-router-dom'
import { Logo } from '../assets/'
import { Button, Input, Password } from '../components'

const Register = () => {
  return (
    <section className="flex xl:max-h-screen relative text-font xl:px-0 xl:py-0 py-[40px] px-[18px]">
      <div className="flex-1 flex relative items-center justify-center flex-col xl:flex-row">
        <div className="static mb-[60px] flex-col xl:flex-row xl:absolute top-8 z-50 left-8 font-source flex items-center gap-4">
          <img src={Logo} alt="logo-white" className="w-8 h-8" />
          <span className="text-font font-semibold text-xl">BSU (Bank Soal Unika)</span>
        </div>

        <div className="xl:w-[55%] font-poppins flex flex-col gap-9 xl:gap-10 w-full">
          <div className="flex gap-2 flex-col">
            <h1 className="text-[28px] xl:text-[36px] font-semibold">Daftar</h1>
            <p className="text-font/50 text-[15px] xl:text-sm font-medium">
              Silahkan isi data yang diperlukan dibawah ini untuk membuat akun BSU Anda
            </p>
          </div>

          <form className="flex flex-col gap-8 xl:gap-7">
            <Input label="Username" type="text" />
            <Input label="Email" type="email" />
            <Password isRegister />
            <Button>Daftar</Button>
          </form>

          <div className="text-center font-semibold text-font text-sm xl:text-base">
            <span>Sudah punya akun? </span>
            <Link to="/login" className="text-primary">
              Login!
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 xl:flex brightness-50 hidden">
        <img src="https://source.unsplash.com/random/?indonesian" alt="" className="w-full min-h-screen object-cover" />
      </div>
    </section>
  )
}

export default Register
