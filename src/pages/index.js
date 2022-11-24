import { Button, CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { getAllQuestions, setAllQuestions } from "../config/redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../middlewares/authPage";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Home() {
  // const [page, setPage] = useState(2);
  // const [questions, setQuestions] = useState([]);

  const dispatch = useDispatch();
  const { questions, filtered } = useSelector(state => state.postReducer);
  const menus = [...new Set(filtered.map((Val) => Val.fakultas))];

  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);

  // const handleScroll = () => {
  //   const { scrollHeight, scrollTop } = document.documentElement;
  //   if (window.innerHeight + scrollTop + 1 >= scrollHeight) setPage((prev) => prev + 1);
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [])

  const filterItem = (curcat) => {
    const newItems = filtered.filter((question) => question.fakultas === curcat);
    dispatch(setAllQuestions(newItems));
  }

  return (
    <Layout title="BSU - Home">
      {questions.length > 0 && <Filter filterItem={filterItem} all={filtered} menus={menus} />}
      <Gap style="h-10" />
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
      <div className="flex w-auto md:w-[400px] gap-10 mx-auto items-center mt-[50px] md:mt-[70px]">
        <div className="bg-primary text-font w-full h-9 font-bold rounded-lg hover:bg-primary/70">
          <Button>Previous</Button>
        </div>
        <p className="font-bold text-font text-2xl">
          1/3
          {/* {page.current_page}/{page.total_page} */}
        </p>
        <div className="bg-primary text-font w-full h-9 font-bold rounded-lg hover:bg-primary/70">
          <Button>Next</Button>
        </div>
      </div>
    </Layout>
  );
}
