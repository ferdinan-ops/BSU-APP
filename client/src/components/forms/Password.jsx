import { useState } from 'react'
import Label from './Label'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import { Icon } from '../atoms'

const Password = ({ label, id, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const { register, formState } = useFormContext()
  const { errors } = formState

  return (
    <div className="flex flex-col gap-1.5 xl:gap-2.5">
      <Label htmlFor={label}>{label}</Label>
      <div className="relative">
        <input
          {...register(id)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          autoComplete="on"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
          className={clsx(
            'input-base border-2 px-4 py-2 xl:px-6 xl:py-3',
            errors[id] ? 'border-red-400 focus:border-red-400' : 'border-slate-200 focus:border-primary'
          )}
        />
        <Icon
          className="absolute right-0 top-1/2 mr-3 h-8 w-8 -translate-y-1/2 text-slate-400 md:mr-4"
          onClick={togglePassword}
        >
          {showPassword ? <HiEyeSlash className="text-xl" /> : <HiEye className="text-xl" />}
        </Icon>
      </div>
      {errors[id] && <span className="-mt-1 text-xs text-red-400 xl:text-sm">{errors[id]?.message}</span>}
    </div>
  )
}

export default Password
