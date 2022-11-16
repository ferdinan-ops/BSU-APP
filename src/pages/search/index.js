import { MenuBar, SearchBar } from '../../components';
import { allLinks } from '../../utils/listData';
import Head from 'next/head';
import React from 'react';

export default function Search() {
  const menus = allLinks(1);

  return (
    <>
      <Head>
        <title>BSU - Search</title>
      </Head>
      <section className='min-h-screen bg-gradient-to-br from-primary to-[#cc9704] md:hidden'>
        <SearchBar style="top-36 w-[85%] mx-auto" isMobile />
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <MenuBar menus={menus} />
        </div>
      </section>
    </>
  )
}
