import { useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

const Password = ({ isRegister, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)
  let icons
  if (showPassword) {
    icons = <HiEyeSlash className="cursor-pointer text-2xl" />
  } else {
    icons = <HiEye className="cursor-pointer text-2xl" />
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex font-semibold justify-between items-center">
        <label htmlFor="password" className="tracking-wide">
          Kata Sandi
        </label>
        {!isRegister && <span className="text-primary cursor-pointer">Lupa kata sandi?</span>}
      </div>
      <div className="flex items-center gap-3 bg-[#F3F4F6] px-8 py-5 rounded overflow-hidden">
        <input
          className="outline-none w-full h-full text-base bg-transparent"
          type={showPassword ? 'text' : 'password'}
          id="password"
          required
          {...rest}
        />
        <div className="pl-2 text-slate-400" onClick={() => setShowPassword(!showPassword)}>
          {icons}
        </div>
      </div>
    </div>
  )
}

export default Password
