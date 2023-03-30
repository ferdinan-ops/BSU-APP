import { Link } from 'react-router-dom'
import { LogoWhite } from '../assets/'
import { Button, Input, Password } from '../components'

const Register = () => {
  return (
    <section className="flex max-h-screen relative text-font">
      <div className="absolute top-8 z-50 left-8 font-source font-semibold text-xl text-white flex items-center gap-4">
        <img src={LogoWhite} alt="logo-white" className="w-8 h-8" />
        <span>BSU (Bank Soal Unika)</span>
      </div>

      <div className="flex-1 flex brightness-50">
        <img src="https://source.unsplash.com/random/?indonesian" alt="" className="w-full min-h-screen object-cover" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[60%] font-poppins flex flex-col gap-10">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl font-semibold">Daftar</h1>
            <p className="text-font/50 font-medium">
              Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus langsung jadi deh!
            </p>
          </div>

          <form className="flex flex-col gap-8">
            <Input label="Username" type="text" />
            <Input label="Email" type="email" />
            <Password isRegister />
            <Button>Daftar</Button>
          </form>

          <div className="text-center font-semibold text-font">
            <span>Sudah punya akun? </span>
            <Link to="/login" className="text-primary">
              Login!
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
