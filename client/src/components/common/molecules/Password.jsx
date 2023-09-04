import { useState } from 'react'
import { Input, Label } from '../atoms'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

const Password = ({ label, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <Label htmlFor={label}>{label}</Label>
      <div
        className={`flex items-center gap-3 overflow-hidden rounded-lg border-2 bg-transparent px-4 py-2 xl:px-6 xl:py-3 ${
          error ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus-within:border-primary'
        }`}
      >
        <Input
          id={label}
          type={showPassword ? 'text' : 'password'}
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          variant="w-full h-full"
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
      {error && <span className="-mt-1 text-xs text-red-400 xl:text-sm">{error}</span>}
    </div>
  )
}

export default Password
