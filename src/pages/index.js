import { CardPost, Filter, Header, Layout } from "../components";
import posts from "../utils/post.json";

export default function Home() {
  return (
    <Layout title="BSU - Home">
      <Header />
      <section>
        <Filter />

        {posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>
    </Layout>
  );
}
