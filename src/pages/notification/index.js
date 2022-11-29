import { deleteNotification, getNotification, setNotif } from '../../config/redux/actions';
import { InfiniteScroll, Layout } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import IconWrapper from '../../components/atoms/Icon';
import { authPage } from '../../middlewares/authPage';
import React, { useEffect, useState } from 'react';
import { cross } from '../../../public';
import Router from 'next/router';

export async function getServerSideProps(context) {
  await authPage(context)
  return { props: {} };
}

export default function Notification() {
  const [page, setPage] = useState(3);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { notif } = useSelector(state => state.notifReducer);

  const { _id: userId } = currentUser;
  const { data, isLoading, counts } = notif;

  useEffect(() => {
    dispatch(getNotification(userId, page));
  }, [dispatch, userId, page]);

  const loadMoreHandler = (e) => {
    e.preventDefault();
    dispatch(setNotif("isLoading", true));
    setPage(page + 3);
  }

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteNotification(id, userId, page));
  }

  const routerHandler = (linkId, isAdmin) => {
    if (!isAdmin) Router.push(`/post/${linkId}`);
  }

  console.log(userId);
  return (
    <Layout title="BSU - Notification">
      <section className='mx-auto mt-[35px] w-full md:w-10/12 xl:w-8/12 text-font md:mt-[60px]'>
        <h1 className="text-center md:text-[32px] font-bold uppercase text-xl mb-[60px]">notifikasi</h1>
        {data.length > 0 ?
          data.map((notif) => (
            <>
              <div
                className={`p-5 cursor-pointer flex gap-2 bg-primary/20 mb-5 rounded-lg flex-col relative ${notif.isAdmin ? "md:flex-col" : "md:flex-row md:items-center md:gap-5"}`}
                onClick={routerHandler.bind(this, notif.linkId, notif.isAdmin)}
                key={notif._id}
              >
                <div className='flex gap-[10px] md:gap-4 items-center'>
                  {notif.userAction.photo ?
                    <img src={notif?.userAction?.photo} alt="" className='w-[25px] h-[25px] md:w-10 md:h-10 rounded-full' /> :
                    <img src="/images/profile.png" alt="" className='w-[25px] h-[25px] md:w-10 md:h-10 rounded-full' />
                  }
                  <span className='text-base md:text-lg font-bold'>{notif?.userAction?.username}</span>
                </div>
                <span className={`md:text-[15px] font-medium ml-[35px] text-xs ${notif.isAdmin ? "md:ml-[35px]" : "md:ml-0"}`}>{notif.message}</span>
                <IconWrapper
                  img={cross}
                  style="bg-[#EB5757]/30 p-2 cursor-pointer absolute -top-3 -right-3 hover:bg-[#EB5757]/70"
                  onClick={deleteHandler.bind(this, notif._id)}
                />
              </div>
              {data.length > 3 && <InfiniteScroll counts={counts} dataLength={data.length} isLoading={isLoading} loadMoreHandler={loadMoreHandler} />}
            </>
          )
          ) : (
            <div className='flex justify-center items-center text-slate-500'>
              <h1>Tidak ada Notifikasi</h1>
            </div>
          )
        }
      </section>
    </Layout>
  )
}
