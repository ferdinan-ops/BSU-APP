import { HiBars3, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { AuthMenu, UserMenu } from '../molecules'
import { useSelector } from 'react-redux'
import { Brand, Input } from '../atoms'
import { useState } from 'react'

const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)

  return (
    <header className="sticky inset-x-0 top-0 z-[999] flex h-20 items-center border-b border-slate-200 bg-white font-source text-font md:h-24">
      <div className="container mx-auto flex items-center justify-between gap-16 px-[18px] xl:px-0">
        <HiBars3 className="text-3xl xl:hidden" onClick={() => setShowNav(!showNav)} />
        <Brand width="xl:h-9 xl:w-9 h-7 w-7" variant="text-xl md:text-[25px]" />
        <HiMagnifyingGlass className="text-[26px] xl:hidden" onClick={() => setShowSearch(!showSearch)} />
        <div
          className={`fixed left-[18px] right-[18px] flex items-center gap-4 rounded-lg border border-slate-300 bg-white px-4 py-2 transition-all focus-within:border-primary xl:static xl:w-full xl:translate-y-0 xl:gap-5 xl:px-6 xl:py-3 ${
            !showSearch ? 'top-0 -translate-y-full' : 'translate-y-0'
          }`}
        >
          <HiMagnifyingGlass className="text-lg text-slate-400 xl:text-xl" />
          <Input type="text" placeholder="Cari Soal..." variant="w-full" />
          <HiXMark className="text-lg text-font xl:hidden" onClick={() => setShowSearch(!setShowSearch)} />
        </div>
        <nav
          className={`fixed inset-0 z-[99999] flex flex-col bg-white p-[18px] transition-all xl:static xl:translate-x-0 xl:flex-row xl:p-0 ${
            !showNav ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <HiXMark className="ml-auto text-4xl xl:hidden" onClick={() => setShowNav(!showNav)} />
          {userInfo ? <UserMenu userInfo={userInfo} /> : <AuthMenu />}
        </nav>
      </div>
    </header>
  )
}

export default Header
