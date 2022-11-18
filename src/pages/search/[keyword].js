import { searchQuestions, setAllQuestions } from '../../config/redux/actions/postAction';
import { CardPost, Filter, Gap, Layout, Promotion } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { authPage } from '../../middlewares/authPage';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  const dispatch = useDispatch();
  const { questions, filtered } = useSelector((state) => state.postReducer);
  const menus = [...new Set(filtered.map((val) => val.fakultas))];

  useEffect(() => {
    dispatch(searchQuestions(keyword));
  }, [dispatch, keyword]);

  const filterItem = (curcat) => {
    const newItem = filtered.filter((question) => question.fakultas === curcat);
    dispatch(setAllQuestions(newItem));
  }

  return (
    <Layout title="BSU - Home">
      <section>
        {questions.length > 0 && <Filter filterItem={filterItem} all={filtered} menus={menus} />}
        <Gap style="h-10" />
        <section className="flex justify-between gap-[30px]">
          <div className="w-full xl:w-7/12">
            {questions.length > 0 ? (
              questions.map((question) => (
                <CardPost post={question} key={question._id} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-xl md:text-3xl text-font font-semibold gap-4 h-full">
                <span className='text-center'>Tidak dapat menemukan soal <span className='text-primary font-bold'>{keyword}</span></span>
                <span className="text-4xl md:text-5xl">😕</span>
              </div>
            )}
          </div>
          <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
            <Promotion />
          </div>
        </section>
      </section>
    </Layout>
  )
}
