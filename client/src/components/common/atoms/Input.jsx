const Input = ({ id, variant, ...rest }) => {
  return (
    <>
      <input
        id={id}
        required
        className={`rounded-lg bg-transparent text-sm outline-none placeholder:text-gray-400 xl:text-[15px] ${variant}`}
        {...rest}
      />
    </>
  )
}

export default Input
