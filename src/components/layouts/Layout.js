import Head from "next/head";
import React from "react";
import { Footer, Header, MenuBar } from "../organisms";
import { Gap } from "../atoms";
import { allLinks } from "../../utils/listData";

export default function Layout({ title, children }) {
  const menus = allLinks(1);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="container mx-auto px-6 md:px-6 xl:px-0 min-h-[calc(100vh-293px-100px)]">
        <Header />
        <Gap style="h-24" />
        {children}
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <MenuBar menus={menus} />
        </div>
      </section>
      <Footer />
    </>
  );
}
