import Head from "next/head";
import React from "react";
import { Footer, Header } from "../organisms";
import { Gap } from "../atoms";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="container mx-auto px-6 md:px-6 xl:px-0">
        <Header />
        <Gap style="h-24" />
        {children}
      </section>
      <Footer />
    </>
  );
}
