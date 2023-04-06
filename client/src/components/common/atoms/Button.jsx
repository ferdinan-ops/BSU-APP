import { Ring } from '@uiball/loaders'

const Button = ({ isLoading, children, className, ...rest }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg py-2 text-sm font-semibold text-font xl:py-3 xl:text-base ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {/* {isLoading ? <DotWave size={34} speed={1} color="white" /> : children} */}
      {isLoading ? <Ring size={24} lineWeight={6} speed={2} color="white" /> : children}
    </button>
  )
}

export default Button
