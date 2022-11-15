import React from 'react'
import { Brand } from '../atoms';

function Footer() {
  return (
    <footer className='w-full text-font bg-primary py-4 mt-[100px] md:mt-[170px]'>
      <div className='flex justify-between container mx-auto px-6 md:px-6 items-center'>
        <div className='font-bold flex gap-3 items-center text-lg'>
          <Brand style="w-7 h-7" title="BSU" isFooter />
        </div>
        <span className='font-medium text-sm'>
          Created by {" "}
          <a href='https://github.com/ferdinan-ops' className='font-bold' target="_blank" rel="noreferrer">
            Ferdinan Imanuel Tumanggor
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer;