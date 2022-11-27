import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import InfiniteScroll from "react-infinite-scroller";
import { authPage } from "../middlewares/authPage";
import { useState } from "react";
import * as API from "../config/hitApi";
import { Ring } from "@uiball/loaders";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function Fakultas() {
  const [page, setPage] = useState(3);
  const [allCount, setAllCount] = useState("");
  const [questions, setQuestions] = useState([]);

  const router = useRouter();
  const { fakultas } = router.query;

  const loadQuestions = async () => {
    try {
      const { data } = await API.filterByFakultasAPI(fakultas, page);
      console.log(data);
      setPage(page + 2);
      setAllCount(data.allCount);
      setQuestions(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title="BSU - Home">
      {questions.length > 0 && <Filter />}
      <Gap style="h-10" />
      <section className="flex justify-between gap-[30px]">
        <div className="w-full xl:w-7/12">
          <InfiniteScroll
            threshold={0}
            pageStart={0}
            loadMore={loadQuestions}
            hasMore={allCount !== questions.length}
            loader={<Ring size={20} lineWeight={5} speed={2} color="#FCB900" />}
          >
            <div>
              {questions.map((question) => (<CardPost post={question} key={question._id} />))}
            </div>
          </InfiniteScroll>
          {allCount === questions.length && <p className="text-center text-slate-300 mt-5">&bull;</p>}
        </div>
        <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
          <Promotion />
        </div>
      </section>
    </Layout>
  )
}
