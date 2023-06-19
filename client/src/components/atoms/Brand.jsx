import clsx from 'clsx'
import { Logo } from '../../assets'

const Brand = ({ variant, width }) => {
  return (
    <div className={clsx('flex items-center gap-3 font-source text-font', variant)}>
      <div className={width}>
        <img src={Logo} alt="logo" className="h-full w-full" />
      </div>
      <span className="font-bold">BSU</span>
    </div>
  )
}

export default Brand
