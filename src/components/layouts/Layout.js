import Head from "next/head";
import React from "react";
import { Footer, Header, MenuBar } from "../organisms";
import { Gap } from "../atoms";
import { allLinks } from "../../utils/listData";
import { RaceBy } from '@uiball/loaders'
import { useSelector } from "react-redux";

export default function Layout({ title, children }) {
  const { currentUser } = useSelector(state => state.authReducer);
  const menus = allLinks(currentUser._id);
  const { isLoadingAll } = useSelector(state => state.globalReducer);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="container mx-auto px-6 md:px-6 xl:px-0 min-h-[calc(100vh-60px-100px)] md:min-h-[calc(100vh-130px-100px)]">
        <Header />
        <Gap style="h-24" />
        {children}
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <MenuBar menus={menus} />
        </div>
      </section>
      <Footer />
      {isLoadingAll &&
        <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white flex items-center justify-center">
          <RaceBy size={350} lineWeight={10} speed={1.4} color="#FCB900" />
        </div>
      }
    </>
  );
}
