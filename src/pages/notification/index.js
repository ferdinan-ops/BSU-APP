import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cross } from '../../../public';
import { Layout } from '../../components';
import IconWrapper from '../../components/atoms/Icon';
import { getNotification } from '../../config/redux/actions';
import { dummy } from '../../utils/dummy';

export default function Notification() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { notif } = useSelector(state => state.notifReducer);

  useEffect(() => {
    dispatch(getNotification(currentUser._id));
  }, [dispatch, currentUser]);


  // useEffect(() => {
  //   const getUsers = dummy.map(({ user }) => user);
  //   setUsers(getUsers);
  // }, []);


  return (
    <Layout title="BSU - Notification">
      <section className='mx-auto mt-[35px] w-full md:w-10/12 xl:w-8/12 text-font md:mt-[60px]'>
        <h1 className="text-center md:text-[32px] font-bold uppercase text-xl mb-[60px]">notifikasi</h1>
        {notif.map((notif) => (
          <div className='p-5 flex md:items-center gap-2 md:gap-5 bg-primary/20 mb-5 md:mb-10 rounded-lg flex-col md:flex-row' key={notif._id}>
            <div className='flex gap-[10px] md:gap-4 items-center'>
              <img src={notif?.userAction?.photo} alt="" className='w-[25px] h-[25px] md:w-10 md:h-10 rounded-full' />
              <span className='text-base md:text-lg font-bold'>{notif?.userAction?.photo}</span>
            </div>
            <span className='md:text-[15px] font-medium ml-[35px] md:ml-0 text-xs'>{notif.message}</span>
          </div>
        ))}
      </section>
    </Layout>
  )
}
