import { HiOutlineBell, HiOutlineHome, HiXMark } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'

import { Avatar, Button, Icon } from '../atoms'
import Search from './Search'

const UserMenu = ({ user, onShowNav }) => {
  const navigate = useNavigate()

  const navigateToCreate = () => {
    onShowNav(false)
    navigate('/create')
  }

  const handleCloseNav = () => {
    onShowNav(false)
  }

  return (
    <div className="flex flex-col-reverse gap-7 xl:flex-row xl:items-center xl:gap-10">
      <Button variant="primary" className="shadow-button xl:w-max xl:px-6 xl:shadow-none" onClick={navigateToCreate}>
        Upload Soal
      </Button>
      <div className="flex flex-col gap-7 font-semibold text-font xl:flex-row xl:items-center xl:gap-7">
        <Link to="/" onClick={handleCloseNav}>
          <Icon className="hidden h-10 w-10 xl:flex">
            <HiOutlineHome className="text-[28px] text-font xl:flex" />
          </Icon>
          <span className="xl:hidden">Beranda</span>
        </Link>
        <Link to="/notification" onClick={handleCloseNav}>
          <Icon className="hidden h-10 w-10 xl:flex">
            <HiOutlineBell className="text-[28px] text-font xl:flex" />
          </Icon>
          <span className="xl:hidden">Notifikasi</span>
        </Link>
        <Link to={`/user/${user._id}`} className="flex items-center gap-3" onClick={handleCloseNav}>
          <Avatar src={user.photo} alt={user.username} size="h-6 w-6 xl:w-11 xl:h-11" />
          <span className="xl:hidden">{user.username}</span>
        </Link>
      </div>
      <Search className="flex items-center justify-between gap-3 xl:hidden">
        <HiXMark className="cursor-pointer text-3xl" onClick={onShowNav} />
      </Search>
    </div>
  )
}

export default UserMenu
