import { getAllQuestions, setQuestions } from "../config/redux/actions/postAction";
import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../middlewares/authPage";
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Home() {
  const [page, setPage] = useState(3);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.postReducer);
  const { data, counts, isLoading } = questions;


  useEffect(() => {
    dispatch(getAllQuestions(filter, page));
  }, [dispatch, page, filter]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    const { scrollTop, scrollHeight } = document.documentElement;
    if (window.innerHeight + scrollTop + 1 >= scrollHeight) {
      dispatch(setQuestions("isLoading", true));
      setPage((prev) => prev + 3);
    }
  };

  const filterItem = async (curcat) => {
    setPage(3);
    setFilter(curcat);
  }

  return (
    <Layout title="BSU - Home">
      {data.length > 0 && <Filter filterItem={filterItem} />}
      <Gap style="h-10" />
      <section className="flex justify-between gap-[30px]">
        <div className="w-full xl:w-7/12">
          {data.length > 0 ? (
            <>
              {data.map((question, idx) => (
                <CardPost post={question} key={idx} />
              ))}
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Ring size={20} lineWeight={5} speed={2} color="#FCB900" />
                </div>
              )}
              {counts === data?.length && (
                <p className="mx-auto text-font font-medium border-2 border-primary border-dashed px-4 py-2 rounded w-fit">
                  Anda telah melihat semuanya 🙂
                </p>
              )}
            </>
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

