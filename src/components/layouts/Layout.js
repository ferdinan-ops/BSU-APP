import Head from "next/head";
import React from "react";
import { Footer, Header } from "../organisms";
import { Gap } from "../atoms";
import { AddIcon, BellIcon, HomeIcon, SearchIcon, UserIcon } from "../../assets/Icons";
import Link from "next/link";

function Linked({ children, href }) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

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
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <div className="w-full bg-font rounded-full h-16 overflow-hidden">
            <div className="flex items-center h-full px-[33px] justify-between w-full">
              <Linked href="/">
                <HomeIcon width={24} height={24} fill="#9F9E9F" />
              </Linked>
              <Linked href="/">
                <SearchIcon width={24} height={24} fill="#9F9E9F" />
              </Linked>
              <Linked href="/">
                <AddIcon width={24} height={24} fill="#9F9E9F" />
              </Linked>
              <Linked href="/">
                <BellIcon width={24} height={24} fill="#9F9E9F" />
              </Linked>
              <Linked href="/">
                <UserIcon width={24} height={24} fill="#9F9E9F" />
              </Linked>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
