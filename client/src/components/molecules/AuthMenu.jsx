import { useNavigate } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'

import { Button } from '../atoms'
import Search from './Search'

const AuthMenu = ({ onShowNav }) => {
  const navigate = useNavigate()

  const handleRegisterNav = () => {
    navigate('/register')
    onShowNav(false)
  }

  const handleLoginNav = () => {
    navigate('/login')
    onShowNav(false)
  }

  return (
    <div className="flex flex-col justify-center gap-4 xl:mt-0 xl:flex-row xl:items-center">
      <Search className="flex items-center justify-between gap-3 xl:hidden">
        <HiXMark className="cursor-pointer text-3xl" onClick={onShowNav} />
      </Search>
      <Button
        variant="secondary"
        className="w-full self-start px-6 uppercase tracking-wide xl:w-fit"
        onClick={handleRegisterNav}
      >
        Daftar
      </Button>
      <Button
        variant="primary"
        className="w-full self-start px-6 uppercase tracking-wide xl:w-fit"
        onClick={handleLoginNav}
      >
        Masuk
      </Button>
    </div>
  )
}

export default AuthMenu
