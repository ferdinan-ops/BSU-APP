import React from 'react'
import { Button } from '../atoms'
import { AddPostBg } from '../../../assets'
import { useNavigate } from 'react-router-dom'

const Promote = () => {
  const navigate = useNavigate()
  return (
    <div className="sticky top-[156px] hidden h-fit flex-1 overflow-hidden rounded-lg bg-white font-source xl:block">
      <div className="relative flex flex-col justify-between gap-5 bg-primary p-5">
        <h1 className="text-center text-xl font-bold text-white">Ayo tambahkan soal yang kamu punya!</h1>
        <img src={AddPostBg} alt="add-post-bg" className="z-10 w-full" />
        <Button className="bg-white px-6 font-bold text-primary hover:bg-slate-200" onClick={() => navigate('/create')}>
          Tambahkan Soal
        </Button>
        <div className="absolute left-1/2 top-1/2 z-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[50px]"></div>
      </div>
    </div>
  )
}

export default Promote
