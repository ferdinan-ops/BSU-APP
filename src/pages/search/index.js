import { Layout, MenuBar, SearchBar } from '../../components';
import { allLinks } from '../../utils/listData';
import Head from 'next/head';
import React from 'react';

export default function Search() {
  const menus = allLinks(1);

  return (
    <div className='md:hidden'>
      <Layout title="BSU - Search">
        <section className='fixed left-2 right-2 top-[86px]'>
          <SearchBar style="w-full mx-auto top-1" isMobile />
        </section>
      </Layout>
    </div>
  )
}
