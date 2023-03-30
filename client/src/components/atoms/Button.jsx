import { DotWave } from '@uiball/loaders'
const Button = ({ isLoading, children, ...rest }) => {
  return (
    <button
      className="bg-primary hover:bg-primary-hover text-font font-bold py-4 rounded disabled:bg-primary/60 shadow-button"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <DotWave size={47} speed={1} color="black" /> : children}
    </button>
  )
}

export default Button
