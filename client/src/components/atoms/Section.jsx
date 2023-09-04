import clsx from 'clsx'
import { useEffect } from 'react'

const Section = ({ children, className, title }) => {
  useEffect(() => {
    document.title = 'Bank Soal Unika  ~ ' + title
  }, [])

  return (
    <section className={clsx('flex w-full flex-col px-[18px] font-source text-font xl:px-0', className)}>
      {children}
    </section>
  )
}

export default Section
