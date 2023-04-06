import React from 'react'
import { Input, Label } from '../atoms'

const TextField = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col gap-2 xl:gap-3">
      <Label htmlFor={label}>{label}</Label>
      <Input id={label} variant="xl:py-3 xl:px-6 px-4 py-2 border border-slate-300 focus:border-primary" {...rest} />
    </div>
  )
}

export default TextField
