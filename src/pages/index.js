import { useState } from "react";
import {
  CardPost,
  Filter,
  Gap,
  Header,
  Layout,
  PromoteCard,
} from "../components";
import postsRes from "../utils/post.json";

export default function Home() {
  const [posts, setPosts] = useState(postsRes);

  return (
    <Layout title="BSU - Home">
      <Header />
      <Gap height={96} />
      <section>
        <Filter />
        <Gap height={40} />
        <section className="flex justify-between gap-[30px]">
          <div className="w-full xl:w-7/12">
            {posts.map((post) => (
              <CardPost post={post} key={post.id} />
            ))}
          </div>
          <div className="sticky top-[130px] hidden  h-[472px] max-h-[472px] w-4/12 xl:block">
            <PromoteCard />
          </div>
        </section>
      </section>
    </Layout>
  );
}
