import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { authPage } from "../middlewares/authPage";
import { useEffect, useState } from "react";
import * as API from "../config/hitApi";
import { Ring } from "@uiball/loaders";
import InfiniteScroll from "react-infinite-scroller";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Home() {
  const [page, setPage] = useState(3);
  const [pageStart, setPageStart] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [allCount, setAllCount] = useState("");
  const [hasMoreItem, setHasMoreItem] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [fakultas, setFakultas] = useState([]);

  useEffect(() => {
    const getAllFakultas = async () => {
      try {
        const { data } = await API.getAllFakultasAPI();
        setFakultas(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllFakultas();
  }, [])


  const loadQuestions = async () => {
    let allData = {};
    if (!isFilter) {
      const { data } = await API.getAllPostAPI(page);
      allData = data;
    } else {
      const { data } = await API.filterByFakultasAPI(isFilter, page);
      allData = data;
    }
    setPage(page + 3);
    setAllCount(allData.allCount);
    setQuestions(allData.data);
  }

  const filterItem = async (curcat) => {
    setPageStart(0);
    setIsFilter(curcat);
    setHasMoreItem(true);
    setPage(3);
  }

  return (
    <Layout title="BSU - Home">
      {/* {questions.length > 0 && <Filter filterItem={filterItem} menus={fakultas} />} */}
      <Gap style="h-10" />
      <section className="flex justify-between gap-[30px]">
        <div className="w-full xl:w-7/12">
          <InfiniteScroll
            threshold={0}
            pageStart={pageStart}
            loadMore={loadQuestions}
            hasMore={allCount !== questions.length}
            loader={<Ring size={20} lineWeight={5} speed={2} color="#FCB900" />}
          >
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
          </InfiniteScroll>
          {hasMoreItem && <p className="text-center text-slate-300 mt-5">&bull;</p>}
        </div>
        <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
          <Promotion />
        </div>
      </section>
    </Layout>
  );
}
