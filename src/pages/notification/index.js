import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from '../../components'
import { getUsers, userSelectors } from '../../config/redux/features';

export default function Notification() {
  const dispatch = useDispatch();
  const users = useSelector(userSelectors.selectAll);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Layout title="BSU - Notification">
      <section className='mx-auto mt-[35px] w-full md:w-10/12 xl:w-8/12 text-font md:mt-[60px]'>
        <h1 className="text-center md:text-[32px] font-bold uppercase text-xl mb-[60px]">notifikasi</h1>
        {users.map(user => (
          <div className='p-5 flex md:items-center gap-2 md:gap-5 bg-primary/20 mb-5 md:mb-10 rounded-lg flex-col md:flex-row' key={user.id}>
            <div className='flex gap-[10px] md:gap-4 items-center'>
              <img src={user.profilePicture} alt="" className='w-[25px] h-[25px] md:w-10 md:h-10 rounded-full' />
              <span className='text-base md:text-lg font-bold'>{user.username}</span>
            </div>
            <span className='md:text-[15px] font-medium ml-[35px] md:ml-0 text-xs'>Berkomentar pada soal yang kamu kirim!</span>
          </div>
        ))}
      </section>
    </Layout>
  )
}
