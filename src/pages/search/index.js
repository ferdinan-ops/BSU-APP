import React from 'react'
import { SearchBar } from '../../components'

export default function Search() {
  return (
    <section className='min-h-screen bg-primary md:hidden flex justify-center items-center'>
      <div className=''>
        <SearchBar />
      </div>
    </section>
  )
}
