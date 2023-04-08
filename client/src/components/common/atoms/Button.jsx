import { Ring } from '@uiball/loaders'

const Button = ({ isLoading, children, className, ...rest }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg py-2 text-sm text-font xl:py-3 ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Ring size={24} lineWeight={6} speed={2} color="white" /> : children}
    </button>
  )
}

export default Button
