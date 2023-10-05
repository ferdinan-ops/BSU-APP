import clsx from 'clsx'

const Container = ({ children, className }) => {
  return <div className={clsx('container mx-auto', className)}>{children}</div>
}

export default Container
