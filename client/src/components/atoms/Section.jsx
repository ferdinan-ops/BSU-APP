import clsx from 'clsx'
import { useEffect } from 'react'

const Section = ({ children, className, title }) => {
  useEffect(() => {
    document.title = 'BSU  ~ ' + title
  }, [])

  return <section className={clsx('flex w-full flex-col font-source', className)}>{children}</section>
}

export default Section
