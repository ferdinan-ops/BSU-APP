import React from 'react'
import { Button } from '../atoms'
import { useNavigate } from 'react-router-dom'

const AuthMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-5 xl:mt-0 xl:flex-row">
      <Button
        className="w-full self-start bg-primary/5 px-6 font-bold uppercase tracking-wide text-primary hover:bg-primary/10 xl:w-fit xl:text-[15px]"
        onClick={() => navigate('/register')}
      >
        Daftar
      </Button>
      <Button
        className="w-full self-start bg-primary px-6 font-bold uppercase tracking-wide text-white shadow-button hover:bg-primary-hover xl:w-fit xl:text-[15px]"
        onClick={() => navigate('/login')}
      >
        Masuk
      </Button>
    </div>
  )
}

export default AuthMenu
