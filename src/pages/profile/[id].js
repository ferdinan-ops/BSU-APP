import { getMyQuestions, getProfile, getSavedQuestions } from "../../config/redux/actions/profileAction";
import { Button, CardPost, Layout, Modals } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../../middlewares/authPage";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("tabs1");

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { profile, myQuestions, savedQuestions } = useSelector(state => state.profileReducer);

  useEffect(() => { dispatch(getProfile(id)) }, [dispatch, id]);
  useEffect(() => { dispatch(getMyQuestions(id)) }, [dispatch, id]);
  useEffect(() => { dispatch(getSavedQuestions(id)) }, [dispatch, id]);

  const logoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove("bsuToken");
    router.push("/auth/login");
  }

  return (
    <>
      {profile && (
        <Layout title={`Profile - ${profile.username}`}>
          <section className='xl:w-8/12 md:w-10/12 w-full mx-auto mt-[60px] text-font'>
            <div className='mb-[55px] md:mb-[72px]'>
              {profile.photo ?
                <img src={profile.profilePicture} className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full mx-auto shadow-profile' alt="" /> :
                <img src="/images/profile.png" className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full mx-auto shadow-profile' alt="" />
              }
              <h1 className='font-bold text-xl md:text-[32px] text-center mt-8'>{profile.username}</h1>
              {profile._id === currentUser._id && (
                <div className='mt-12 flex max-w-[480px] mx-auto gap-5 text-base md:text-lg font-semibold'>
                  <Modals id={id} />
                  <div className='h-[50px] border border-transparent bg-[#EB5757] text-white rounded-lg w-full'>
                    <Button onClick={logoutHandler}>Keluar</Button>
                  </div>
                </div>
              )}
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
                myQuestions.map((question) => (<CardPost post={question} key={question._id} />)) :
                savedQuestions.map((question) => (<CardPost post={question} key={question._id} />))
              }
            </div>
          </section>
        </Layout>
      )}
    </>
  )
}
