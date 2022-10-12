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
          <div className='p-5 flex items-center gap-5 bg-primary/20 mb-10 rounded-lg' key={user.id}>
            <div className='flex gap-4 items-center'>
              <img src={user.profilePicture} alt="" className='w-10 h-10 rounded-full' />
              <span className='text-lg font-bold'>{user.username}</span>
            </div>
            <span className='text-[15px] font-medium'>Berkomentar pada soal yang kamu kirim!</span>
          </div>
        ))}
      </section>
    </Layout>
  )
}
