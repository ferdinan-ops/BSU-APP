import clsx from 'clsx'
import { ImSpinner2 } from 'react-icons/im'

const Button = ({ disabled, loading, children, className, variant, ...rest }) => {
  return (
    <button
      className={clsx(
        'relative flex items-center justify-center rounded-lg text-xs font-bold text-font md:text-sm',
        'disabled:cursor-not-allowed disabled:shadow-none',
        'py-[9px] md:py-[13px]',
        loading && 'disabled:text-transparent',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover disabled:bg-primary/70',
        variant === 'secondary' && 'bg-primary/5 text-primary hover:bg-primary/10',
        variant === 'success' && 'bg-green-500 text-white hover:bg-green-700 disabled:bg-green-500/70',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-700 disabled:bg-red-500/70',
        variant === 'base' && 'bg-white hover:bg-slate-200 disabled:bg-white/70',
        variant === 'outline' && 'border border-slate-300 py-[6px] hover:bg-slate-100 md:py-[10px]',
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
