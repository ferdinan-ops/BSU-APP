import { ImSpinner2 } from 'react-icons/im'

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ImSpinner2 className="animate-spin text-5xl text-[#ddd]" />
    </div>
  )
}

export default Loader
