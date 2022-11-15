import { MenuBar, SearchBar } from '../../components';
import { allLinks } from '../../utils/listData';
import Head from 'next/head';
import React, { useState } from 'react';
import Router from 'next/router';

export default function Search() {
  const menus = allLinks(1);
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (!keyword) return Router.push("/search");
    Router.push(`/search/${keyword}`);
  }

  return (
    <>
      <Head>
        <title>BSU - Search</title>
      </Head>
      <section className='min-h-screen bg-primary md:hidden flex justify-center items-center flex-col'>
        <div className=''>
          <SearchBar submit={searchHandler} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <MenuBar menus={menus} />
        </div>
      </section>
    </>
  )
}
