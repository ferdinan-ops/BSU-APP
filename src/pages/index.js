import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { getAllQuestions, setAllQuestions } from "../config/redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../middlewares/authPage";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Home() {
  const dispatch = useDispatch();
  const { questions, filtered } = useSelector(state => state.postReducer);
  const menus = [...new Set(filtered.map((Val) => Val.fakultas))];

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  const filterItem = (curcat) => {
    const newItems = filtered.filter((question) => question.fakultas === curcat);
    dispatch(setAllQuestions(newItems));
  }

  return (
    <Layout title="BSU - Home">
      {questions.length > 0 && <Filter filterItem={filterItem} all={filtered} menus={menus} />}
      <Gap style="h-10" />
      {/* 96+40 */}
      <section className="flex justify-between gap-[30px]">
        <div className="w-full xl:w-7/12">
          {questions.length > 0 ? (
            questions.map((question) => (
              <CardPost post={question} key={question._id} />
            ))
          ) : (
            <div className="text-center flex flex-col items-center justify-center text-xl md:text-3xl text-font font-bold gap-4 h-full">
              <span>Maaf belum ada soal untuk saat ini</span>
              <span className="text-4xl md:text-5xl">😭</span>
            </div>
          )}
        </div>
        <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
          <Promotion />
        </div>
      </section>
    </Layout>
  );
}
