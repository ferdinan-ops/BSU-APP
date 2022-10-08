import { CardPost, Filter, Gap, Layout, PromoteCard } from "../components";
import { getQuestions, questionSelectors } from "../config/redux/features/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const questions = useSelector(questionSelectors.selectAll);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <Layout title="BSU - Home">
      <section>
        <Filter />
        <Gap style="h-10" />
        <section className="flex justify-between gap-[30px]">
          <div className="w-full xl:w-7/12">
            {questions.map((question) => (
              <CardPost post={question} key={question.id} />
            ))}
          </div>
          <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
            <PromoteCard />
          </div>
        </section>
      </section>
    </Layout>
  );
}
