import { CardPost, Filter, Gap, InfiniteScroll, Layout, Promotion } from "../components";
import { getAllQuestions, setQuestions } from "../config/redux/actions/postAction";
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

  const loadMoreHandler = (e) => {
    e.preventDefault();
    dispatch(setQuestions("isLoading", true));
    setPage(page + 3);
  }

  const filterItem = async (curcat) => {
    setPage(3);
    setFilter(curcat);
  }

  return (
    <Layout title="BSU - Home">
      {data.length > 0 && <Filter filterItem={filterItem} />}
      <Gap style="h-10" />
      <section className="flex justify-between gap-[30px]">
        {data.length > 0 ? (
          <div className="w-full xl:w-7/12">
            {data.map((question, idx) => (
              <CardPost post={question} key={idx} />
            ))}
            {data.length > 3 && <InfiniteScroll counts={counts} dataLength={data.length} isLoading={isLoading} loadMoreHandler={loadMoreHandler} />}
          </div>
        ) : (
          <div className="w-full xl:w-7/12 flex items-center justify-center">
            <Ring size={40} lineWeight={10} speed={2} color="#FCB900" />
          </div>
        )}
        <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
          <Promotion />
        </div>
      </section>
    </Layout>
  );
}

