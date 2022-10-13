import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function Linked({ Icon, href, active }) {
  return (
    <Link href={href}>
      <a>
        <Icon width={24} height={24} fill={active ? "#FCB900" : "#9F9E9F"} />
      </a>
    </Link>
  )
}

export default function MenuBar({ menus }) {
  const router = useRouter();

  return (
    <div className="w-full bg-font rounded-full h-16 overflow-hidden">
      <div className="flex items-center h-full px-[33px] justify-between w-full">
        {menus.map((menu, index) => (
          <div key={index}>
            <Linked href={menu.href} Icon={menu.Icons} active={router.asPath === menu.href} />
          </div>
        ))}
      </div>
    </div>
  )
}
