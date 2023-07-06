import { useGoogleOneTapLogin } from '@react-oauth/google'
import { HiBars3 } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

import { useLoginWithGoogleMutation } from '../../store/api/authApi'
import { AuthMenu, UserMenu } from '../molecules'
import Search from '../molecules/Search'
import { Brand, Icon } from '../atoms'

const Header = () => {
  const [showNav, setShowNav] = useState(false)
  const [login] = useLoginWithGoogleMutation()
  const user = useSelector((state) => state.auth.userInfo)

  !user &&
    useGoogleOneTapLogin({
      onSuccess: async (response) => {
        await login({ idToken: response.credential }).unwrap()
        window.location.reload()
        window.location.reload()
      }
    })

  const onShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <header className="sticky inset-x-0 top-0 z-[999] flex h-20 items-center border-b border-slate-200 bg-white font-source text-font md:h-24">
      <div className="container mx-auto flex items-center justify-between gap-16 px-[18px] xl:px-0">
        <Link to="/">
          <Brand width="xl:h-9 xl:w-9 h-7 w-7" variant="text-xl md:text-[25px]" />
        </Link>
        <Icon className="h-10 w-10 xl:hidden">
          <HiBars3 className="text-3xl" onClick={onShowNav} />
        </Icon>
        <Search className="hidden w-full xl:block" />

        <nav
          className={clsx(
            'fixed inset-0 z-[99999] transition-all xl:static xl:translate-x-0',
            'bg-white p-[18px] xl:p-0',
            !showNav ? '-translate-x-full' : 'translate-x-0'
          )}
        >
          {user ? <UserMenu user={user} onShowNav={onShowNav} /> : <AuthMenu onShowNav={onShowNav} />}
        </nav>
      </div>
    </header>
  )
}

export default Header
