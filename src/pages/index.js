import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { getDummyQuestions, questionDummySelectors } from "../config/redux/features";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const questions = useSelector(questionDummySelectors.selectAll);
  const menus = [...new Set(questions.map((Val) => Val.fakultas))];

  useEffect(() => {
    dispatch(getDummyQuestions())
  }, [dispatch]);

  useEffect(() => {
    if (questions) setItems(questions)
  }, [questions])


  const filterItem = (curcat) => {
    const newItems = questions.filter(questions => questions.fakultas === curcat);
    setItems(newItems);
  }

  return (
    <Layout title="BSU - Home">
      <section>
        <Filter setItems={setItems} filterItem={filterItem} all={questions} menus={menus} />
        <Gap style="h-10" />
        <section className="flex justify-between gap-[30px]">
          <div className="w-full xl:w-7/12">
            {items.map((question) => (
              <CardPost post={question} key={question.id} />
            ))}
          </div>
          <div className="sticky top-[130px] hidden h-[472px] max-h-[472px] w-4/12 xl:block">
            <Promotion />
          </div>
        </section>
      </section>
    </Layout>
  );
}
