import clsx from 'clsx'
import { ImSpinner2 } from 'react-icons/im'

const Button = ({ disabled, loading, children, className, variant, ...rest }) => {
  return (
    <button
      className={clsx(
        'relative flex items-center justify-center rounded-lg text-sm font-bold text-font',
        'disabled:cursor-not-allowed disabled:shadow-none',
        loading && 'disabled:text-transparent',
        variant === 'primary' && 'bg-primary py-2 text-white hover:bg-primary-hover disabled:bg-primary/70 md:py-3',
        variant === 'secondary' && 'bg-white py-2 hover:bg-slate-200 disabled:bg-white/70 md:py-3',
        variant === 'outline' && 'border border-slate-300 py-[7px] hover:bg-slate-100 md:py-[11px]',
        variant === 'danger' && 'bg-red-500 py-2 text-white hover:bg-red-700 disabled:bg-red-500/70 md:py-3',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ImSpinner2 className="animate-spin text-white" />
        </div>
      )}
      {children}
    </button>
  )
}

export default Button
