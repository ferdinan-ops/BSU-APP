import clsx from 'clsx'
import { useEffect } from 'react'

const Section = ({ children, className, title }) => {
  useEffect(() => {
    document.title = 'Bank Soal Unika  ~ ' + title
  }, [])

  return <section className={clsx('flex w-full flex-col font-source text-font', className)}>{children}</section>
}

export default Section
