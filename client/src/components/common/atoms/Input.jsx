// const Input = ({ label, ...rest }) => {
//   return (
//     <div className="flex flex-col xl:gap-3 gap-2">
//       <label htmlFor={label} className="font-semibold tracking-wide text-[13px] md:text-sm">
//         {label}
//       </label>
//       <input
//         className="xl:py-3 xl:px-6 px-4 py-2 text-sm rounded-lg xl:text-[15px] bg-transparent outline-none placeholder:text-gray-400 border border-slate-300 focus:border-font"
//         id={label}
//         required
//         {...rest}
//       />
//     </div>
//   )
// }

// export default Input

const Input = ({ id, variant, ...rest }) => {
  return (
    <>
      <input
        id={id}
        required
        className={`text-sm rounded-lg xl:text-[15px] bg-transparent outline-none placeholder:text-gray-400 ${variant}`}
        {...rest}
      />
    </>
  )
}

export default Input
