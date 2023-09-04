import clsx from 'clsx'

const Skeleton = ({ className }) => {
  return <div className={clsx('animate-pulse bg-slate-300 text-transparent', className)}>T</div>
}

export default Skeleton
