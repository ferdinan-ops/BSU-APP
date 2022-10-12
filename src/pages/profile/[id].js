import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardPost, Layout, Modals } from "../../components"
import { getQuestions, getUsers, questionSelectors, userSelectors } from '../../config/redux/features';

export default function Profile() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("tabs1");

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
      const savedQuestions = questions.filter(({ saved }) => saved.some(save => save.id_user === parseInt(id)));
      setMyQuestions(filtered);
      setSaved(savedQuestions);
    }
  }, [questions, id]);

  return (
    <>
      {user && (
        <Layout title={`Profile - ${user.username}`}>
          <section className='xl:w-8/12 md:w-10/12 w-full mx-auto mt-[60px] text-font'>
            <div className='mb-[55px] md:mb-[72px]'>
              <img src={user.profilePicture} className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full mx-auto shadow-profile' alt="" />
              <h1 className='font-bold text-xl md:text-[32px] text-center mt-8'>{user.username}</h1>
              <div className='mt-12 flex max-w-[480px] mx-auto gap-5 text-base md:text-lg font-semibold'>
                <Modals id={id} />
                <div className='h-[50px] border border-transparent bg-[#EB5757] text-white rounded-lg w-full'><Button>Keluar</Button></div>
              </div>
            </div>

            <div className='flex font-semibold text-base md:text-xl transition-all duration-300'>
              <button className={`tabs ${activeTab === "tabs1" ? "text-primary" : "text-slate-300"}`} onClick={() => setActiveTab("tabs1")}>
                Soal Anda
              </button>
              <button className={`tabs ${activeTab === "tabs2" ? "text-primary" : "text-slate-300"}`} onClick={() => setActiveTab("tabs2")}>
                Soal yang Disimpan
              </button>
            </div>

            <div className='w-full mt-6 md:mt-10'>
              {activeTab === "tabs1" ?
                myQuestions.map((question) => (
                  <CardPost post={question} key={question.id} />
                ))
                :
                saved.map((question) => (
                  <CardPost post={question} key={question.id} />
                ))
              }
            </div>
          </section>
        </Layout>
      )}
    </>
  )
}
