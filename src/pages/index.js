import { CardPost, Filter, Header, Layout } from "../components";

export default function Home() {
  return (
    <Layout title="BSU - Home">
      <Header />
      <section>
        <Filter />
        {/* <CardPost /> */}
      </section>
    </Layout>
  );
}
