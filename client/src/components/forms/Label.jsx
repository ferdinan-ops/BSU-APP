const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="font-semibold tracking-wide text-[13px] md:text-sm">
      {children}
    </label>
  )
}

export default Label
