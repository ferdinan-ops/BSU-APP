import Image from 'next/image'
import React from 'react'

export default function IconWrapper({ img, style, children }) {
  return (
    <div className={`icon-wrapper ${style}`}>
      <Image src={img} alt="" width={15} height={15} />
      {children}
    </div>
  )
}
