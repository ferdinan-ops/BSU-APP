import clsx from 'clsx'

const Icon = ({ children, className, ...rest }) => {
  return (
    <div
      className={clsx('flex cursor-pointer items-center justify-center rounded-full hover:bg-slate-200', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Icon
