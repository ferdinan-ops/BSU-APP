import { Link } from 'react-router-dom'
import clsx from 'clsx'

const Tab = ({ href, active, children }) => {
  return (
    <Link
      to={href}
      className={clsx(
        'flex flex-1 cursor-pointer items-center justify-center gap-4 border-b-2 py-3 hover:bg-slate-100 md:py-4',
        active ? 'border-primary text-primary' : 'border-slate-300 text-slate-400'
      )}
    >
      {children}
    </Link>
  )
}

export default Tab
