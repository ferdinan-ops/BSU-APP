import React from 'react'

const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={label} className="font-semibold tracking-wide">
        {label}
      </label>
      <input className="px-8 py-4 rounded text-base bg-[#F2F2F2] outline-none" id={label} required {...rest} />
    </div>
  )
}

export default Input
