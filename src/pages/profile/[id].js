import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardPost, Layout } from "../../components"
import { getQuestions, getUsers, questionSelectors, userSelectors } from '../../config/redux/features';

export default function Profile() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [saved, setSaved] = useState([]);

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
      const savedQuestions = questions.filter((quest) => quest.saved.id_user === parseInt(id));
      setMyQuestions(filtered);
      setSaved(savedQuestions);
    }
  }, [questions, id]);


  return (
    <>
      {user && (
        <Layout title={`Profile - ${user.username}`}>
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
              <div className='flex font-semibold text-xl'>
                <button className='border-b-4 w-full pb-4 text-primary'>Soal Anda</button>
                <button className='border-b-4 w-full pb-4 text-gray-2'>Soal yang Disimpan</button>
              </div>
              <div className='w-full mt-10'>
                {myQuestions.map((question) => (
                  <CardPost post={question} key={question.id} />
                ))}
              </div>
            </div>
          </section>
        </Layout>
      )}
    </>
  )
}
