import React, { useState } from 'react'
import { Input, Label } from '../atoms'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

const Password = ({ label, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center gap-3 overflow-hidden rounded-lg border border-slate-300 bg-transparent px-4 py-2 focus-within:border-primary xl:px-6 xl:py-3">
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
    </div>
  )
}

export default Password
