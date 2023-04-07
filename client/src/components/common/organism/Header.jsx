import { HiBars3, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { Brand, Button, Input } from '../atoms'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky inset-x-0 top-0 flex h-20 items-center bg-white font-source text-font md:h-24">
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
          className={`fixed inset-0 flex flex-col bg-white p-[18px] transition-all xl:static xl:translate-x-0 xl:flex-row xl:p-0 ${
            !showNav ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <HiXMark className="ml-auto text-4xl xl:hidden" onClick={() => setShowNav(!showNav)} />
          <div className="mt-8 flex flex-col items-center justify-center gap-5 xl:mt-0 xl:flex-row">
            <Button className="w-full self-start bg-primary/5 px-6 hover:bg-primary/10 xl:w-fit">
              <Link to="/register" className="text-[15px] font-bold uppercase tracking-wide text-primary">
                Daftar
              </Link>
            </Button>
            <Button className="w-full self-start bg-primary px-6 shadow-button hover:bg-primary-hover xl:w-fit">
              <Link to="/login" className="text-[15px] font-bold uppercase tracking-wide text-white">
                Masuk
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
