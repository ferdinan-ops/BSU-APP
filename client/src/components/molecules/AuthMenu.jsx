import { useNavigate } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'

import { Button } from '../atoms'
import Search from './Search'

const AuthMenu = ({ onShowNav }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center gap-4 xl:mt-0 xl:flex-row xl:items-center">
      <Search className="flex items-center justify-between gap-3 xl:hidden">
        <HiXMark className="cursor-pointer text-3xl" onClick={onShowNav} />
      </Search>
      <Button
        variant="secondary"
        className="w-full self-start px-6 uppercase tracking-wide xl:w-fit"
        onClick={() => navigate('/register')}
      >
        Daftar
      </Button>
      <Button
        variant="primary"
        className="w-full self-start px-6 uppercase tracking-wide xl:w-fit"
        onClick={() => navigate('/login')}
      >
        Masuk
      </Button>
    </div>
  )
}

export default AuthMenu
