import clsx from 'clsx'

const Container = ({ children, className }) => {
  return <div className={clsx('container mx-auto px-[18px] xl:px-0', className)}>{children}</div>
}

export default Container
