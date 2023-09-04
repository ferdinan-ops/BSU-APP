import React from 'react'
import { Input, Label } from '../atoms'

const TextField = ({ label, error, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 xl:gap-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        variant={`xl:py-3 xl:px-6 px-4 py-2 border-2 ${
          error ? 'focus:border-red-400 border-red-400' : 'border-slate-200 focus:border-primary'
        }`}
        {...rest}
      />
      {error && <span className="-mt-1 text-xs text-red-400 xl:text-sm">{error}</span>}
    </div>
  )
}

export default TextField
