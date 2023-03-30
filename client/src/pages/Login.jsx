import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogoWhite } from '../assets'
import { FcGoogle } from 'react-icons/fc'
import { Password, Input, Button } from '../components'

const Login = () => {
  useEffect(() => {
    document.title = 'BSU ~ Login'
  }, [])

  return (
    <section className="flex max-h-screen relative text-font">
      <div className="absolute top-8 z-50 left-8 font-source flex items-center gap-4">
        <img src={LogoWhite} alt="logo-white" className="w-8 h-8" />
        <span className="text-white font-semibold text-xl">BSU (Bank Soal Unika)</span>
      </div>

      <div className="flex-1 flex brightness-50">
        <img src="https://source.unsplash.com/random/?university" alt="" className="w-full min-h-screen object-cover" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[55%] font-poppins flex flex-col gap-10">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl font-semibold">Masuk</h1>
            <p className="text-font/50 font-medium">
              Hai, selamat datang di BSU (Bank Soal Unika), silahkan isi data yang diperlukan untuk bisa masuk ke
              aplikasi
            </p>
          </div>

          <button className="flex gap-5 shadow-md rounded py-5 justify-center font-medium bg-slate-100 hover:bg-slate-200">
            <FcGoogle className="text-2xl" />
            <span className="text-font">Masuk dengan Google</span>
          </button>

          <div className="flex gap-5 items-center">
            <span className="border border-font/30 h-[2px] w-full"></span>
            <span className="text-font font-medium">atau</span>
            <span className="border border-font/30 h-[2px] w-full"></span>
          </div>

          <form className="flex flex-col gap-8">
            <Input label="Email" type="email" />
            <Password />
            <Button>Masuk</Button>
          </form>
          <p className="text-center font-semibold text-font">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary">
              Daftar sekarang, gratis!
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
