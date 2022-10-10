import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardPost, Layout, Tabs } from "../../components"
import { getQuestions, getUsers, questionSelectors, userSelectors } from '../../config/redux/features';

export default function Profile() {
  const [myQuestions, setMyQuestions] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const user = useSelector(state => userSelectors.selectById(state, id));
  const questions = useSelector(questionSelectors.selectAll);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions) {
      const filtered = questions.filter((quest) => quest.user.id === parseInt(id));
      setMyQuestions(filtered);
    }
  }, [questions, id]);


  return (
    <Layout title="Profile - Username">
      {user && (
        <section className='w-8/12 mx-auto mt-[60px] text-font'>
          <div className='mb-[72px]'>
            <img src={user.profilePicture} className='w-[200px] h-[200px] rounded-full mx-auto' alt="" />
            <h1 className='font-bold text-[32px] text-center mt-5'>{user.username}</h1>
            <div className='mt-[30px] flex max-w-[480px] mx-auto gap-5 text-lg font-semibold'>
              <div className='h-[50px] border border-[#C2C9D1] rounded-lg w-full'><Button>Ubah Profil</Button></div>
              <div className='h-[50px] border border-transparent bg-[#EB5757] text-white rounded-lg w-full'><Button>Keluar</Button></div>
            </div>
          </div>

          <div className=''>
            <Tabs />
            <div className='w-full'>
              {myQuestions.map((question) => (
                <CardPost post={question} key={question.id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
