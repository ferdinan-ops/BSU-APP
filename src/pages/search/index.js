import Head from 'next/head'
import React from 'react'
import { MenuBar, SearchBar } from '../../components'
import { allLinks } from '../../utils/listData'

export default function Search() {

  const menus = allLinks(1);
  return (
    <>
      <Head>
        <title>BSU - Search</title>
      </Head>
      <section className='min-h-screen bg-primary md:hidden flex justify-center items-center flex-col'>
        <div className=''>
          <SearchBar />
        </div>
        <div className="fixed bottom-10 z-20 left-6 right-6 block md:hidden">
          <MenuBar menus={menus} />
        </div>
      </section>
    </>
  )
}
