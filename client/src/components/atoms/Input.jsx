const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col xl:gap-3 gap-2">
      <label htmlFor={label} className="font-semibold tracking-wide text-[15px] xl:text-base">
        {label}
      </label>
      <input
        className="xl:py-4 xl:px-8 px-6 py-3 text-[15px] rounded xl:text-base bg-[#F3F4F6] outline-none"
        id={label}
        required
        {...rest}
      />
    </div>
  )
}

export default Input
