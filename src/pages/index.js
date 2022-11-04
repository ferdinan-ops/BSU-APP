import { CardPost, Filter, Gap, Layout, Promotion } from "../components";
import { useState } from "react";
import { dummy } from "../utils/dummy";
import { authPage } from "../middlewares/authPage";

export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  return { props: {} };
}

export default function Home() {
  const [questions, setQuestions] = useState(dummy);
  const [filtered, setFiltered] = useState(dummy);

  const menus = [...new Set(filtered.map((Val) => Val.fakultas))];

  const filterItem = (curcat) => {
    const newItems = dummy.filter((question) => question.fakultas === curcat);
    setQuestions(newItems);
  }

  return (
    <Layout title="BSU - Home">
      <section>
        <Filter setItems={setQuestions} filterItem={filterItem} all={dummy} menus={menus} />
        <Gap style="h-10" />
        <section className="flex justify-between gap-[30px]">
          <div className="w-full xl:w-7/12">
            {questions.map((question) => (
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
