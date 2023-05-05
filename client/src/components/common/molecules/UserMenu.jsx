import React from 'react'
import { Avatar, Button } from '../atoms'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineBell, HiOutlineHome } from 'react-icons/hi2'

const UserMenu = ({ userInfo, onShowNav }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col-reverse gap-6 xl:flex-row xl:items-center xl:gap-10">
      <Button
        className="mt-5 bg-primary font-bold text-white shadow-button hover:bg-primary-hover xl:mt-0 xl:w-max xl:px-6 xl:shadow-none"
        onClick={() => navigate('/create')}
      >
        Upload Soal
      </Button>
      <div className="flex flex-col gap-6 font-semibold text-font xl:flex-row xl:items-center xl:gap-10">
        <Link to="/">
          <HiOutlineHome className="hidden text-[28px] text-font xl:flex" />
          <span className="xl:hidden">Beranda</span>
        </Link>
        <Link to="/notification">
          <HiOutlineBell className="hidden text-[28px] text-font xl:flex" />
          <span className="xl:hidden">Notifikasi</span>
        </Link>
        <Link to={`/user/${userInfo._id}`} className="flex items-center gap-3">
          <Avatar
            src={userInfo.photo}
            alt={userInfo.username}
            size="h-6 w-6 xl:w-11 xl:h-11 border-2 border-slate-200"
            provider={userInfo.provider}
          />
          <span className="xl:hidden">{userInfo.username}</span>
        </Link>
      </div>
    </div>
  )
}

export default UserMenu
