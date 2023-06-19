import clsx from 'clsx'
import { ImSpinner2 } from 'react-icons/im'

const Button = ({ disabled, children, className, variant, ...rest }) => {
  return (
    <button
      className={clsx(
        'relative flex items-center justify-center rounded-lg py-2 text-sm font-bold text-font xl:py-3',
        'disabled:cursor-not-allowed disabled:text-transparent',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover disabled:bg-primary/70',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {disabled && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ImSpinner2 className="animate-spin text-white" />
        </div>
      )}
      {children}
    </button>
  )
}

export default Button
