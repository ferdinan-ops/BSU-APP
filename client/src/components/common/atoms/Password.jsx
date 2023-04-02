import { useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

const Password = ({ isRegister, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex font-semibold justify-between items-center text-[15px] md:text-base">
        <label htmlFor="password" className="tracking-wide">
          Kata Sandi
        </label>
        {!isRegister && <span className="text-primary cursor-pointer">Lupa kata sandi?</span>}
      </div>
      <div className="flex items-center gap-3 bg-[#F3F4F6] xl:px-8 xl:py-4 px-6 py-3 rounded overflow-hidden">
        <input
          className="outline-none w-full h-full xl:text-[15px] text-sm bg-transparent placeholder:text-gray-400"
          type={showPassword ? 'text' : 'password'}
          id="password"
          required
          {...rest}
        />
        <div className="pl-2 text-slate-400" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <HiEyeSlash className="cursor-pointer text-xl" />
          ) : (
            <HiEye className="cursor-pointer text-xl" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Password
