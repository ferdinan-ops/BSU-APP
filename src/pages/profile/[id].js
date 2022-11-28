import { getProfile, getProfileQuestions, setProfileQuestions } from "../../config/redux/actions/profileAction";
import { Button, CardPost, InfiniteScroll, Layout, Modals } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../../middlewares/authPage";
import React, { useEffect, useState } from 'react';
import { dummyProfile } from "../../../public";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import Image from "next/image";
import { Ring } from "@uiball/loaders";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("tabs1");
  const [page, setPage] = useState(3);

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { profile, profileQuestions } = useSelector(state => state.profileReducer);

  const { _id: currentId } = currentUser;
  const { _id: profileId } = profile;
  const { data, isLoading, counts } = profileQuestions;

  useEffect(() => { setActiveTab("tabs1") }, []);
  useEffect(() => { dispatch(getProfile(id)) }, [dispatch, id]);
  useEffect(() => { dispatch(getProfileQuestions(id, page, activeTab)) }, [dispatch, id, page, activeTab]);

  const tabsHandler = (tabs) => {
    setActiveTab(tabs);
    setPage(3);
  }

  const loadMoreHandler = (e) => {
    e.preventDefault();
    dispatch(setProfileQuestions("isLoading", true));
    setPage(page + 3);
  }

  const logoutHandler = (e) => {
    e.preventDefault();
    const ask = confirm("Anda yakin ingin keluar dari aplikasi?");
    if (ask) {
      Cookies.remove("bsuToken");
      router.push("/auth/login");
    }
  }

  return (
    <>
      {profile && (
        <Layout title={`Profile - ${profile.username}`}>
          <section className='xl:w-8/12 md:w-10/12 w-full mx-auto mt-[60px] text-font'>
            <div className='mb-[55px] md:mb-[72px]'>
              <div className="relative w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-full mx-auto shadow-profile overflow-hidden">
                {profile.photo ?
                  <Image src={profile.photo} layout="fill" objectFit="cover" alt="" /> :
                  <Image src={dummyProfile} layout="fill" objectFit="cover" alt="" />
                }
              </div>
              <h1 className='font-bold text-xl md:text-[32px] text-center mt-8'>{profile.username}</h1>
              {currentId === profileId && (
                <div className='mt-12 flex max-w-[480px] mx-auto gap-5 text-base md:text-lg font-semibold'>
                  <Modals />
                  <div className='h-[50px] border border-transparent bg-[#EB5757] text-white rounded-lg w-full'>
                    <Button onClick={logoutHandler}>Keluar</Button>
                  </div>
                </div>
              )}
            </div>

            <div className='flex font-semibold text-base md:text-xl transition-all duration-300'>
              <button className={`tabs ${activeTab === "tabs1" ? "text-primary" : "text-slate-300"}`} onClick={() => tabsHandler("tabs1")}>
                Soal {currentId === profileId ? "Anda" : "yang dibuat"}
              </button>
              {currentId === profileId && (
                <button className={`tabs ${activeTab !== "tabs1" ? "text-primary" : "text-slate-300"}`} onClick={() => tabsHandler("tabs2")}>
                  Soal yang Disimpan
                </button>
              )}
            </div>

            <div className='w-full mt-6 md:mt-10'>
              <>
                {data.length > 0 ? (
                  <>
                    {data.map((question) => <CardPost post={question} key={question._id} />)}
                    <InfiniteScroll counts={counts} dataLength={data.length} isLoading={isLoading} loadMoreHandler={loadMoreHandler} />
                  </>
                ) : (
                  activeTab === "tabs1" ? (
                    <p className="text-font font-medium text-center text-sm md:text-base">Anda belum memiliki soal 😔</p>) : (
                    <p className="text-font font-medium text-center text-sm md:text-base">Anda belum memiliki soal yang disimpan 😔</p>)
                )}
              </>
            </div>
          </section>
        </Layout>
      )}
    </>
  )
}
