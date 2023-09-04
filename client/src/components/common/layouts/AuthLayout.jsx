import { Outlet } from 'react-router-dom'
import { LoginBg } from '../../../assets'
import { Brand } from '../atoms'

const AuthLayout = () => {
  return (
    <section className="relative flex px-[18px] py-[40px] text-font xl:max-h-screen xl:px-0 xl:py-0">
      <div className="relative flex flex-1 flex-col items-center justify-center xl:flex-row">
        <Brand width="h-7 w-7" variant="static left-8 top-8 z-50 mb-[40px] text-lg xl:absolute xl:mb-0 xl:text-xl" />
        <Outlet />
      </div>
      <div className="hidden min-h-screen flex-1 xl:flex">
        <img src={LoginBg} alt="login-bg" className="h-full w-full object-cover brightness-50" />
      </div>
    </section>
  )
}

export default AuthLayout
