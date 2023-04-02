import { DotWave } from '@uiball/loaders'
const Button = ({ isLoading, children, className, ...rest }) => {
  return (
    <button
      // className="bg-primary flex items-center justify-center hover:bg-primary-hover text-font font-bold py-3 text-sm xl:text-base xl:py-4 rounded disabled:bg-primary/60 shadow-button"
      className={`flex items-center justify-center text-font font-semibold py-3 text-sm xl:text-base xl:py-4 rounded ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <DotWave size={34} speed={1} color="white" /> : children}
    </button>
  )
}

export default Button
