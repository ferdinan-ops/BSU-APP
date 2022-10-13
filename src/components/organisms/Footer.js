import React from 'react'
import { Brand } from '../atoms';

function Footer() {
  return (
    <footer className='w-full h-[293px] flex flex-col gap-8 justify-center items-center bg-primary mt-[100px] md:mt-[170px]'>
      <div className='font-bold text-5xl flex flex-col items-center gap-5'>
        <Brand style="w-20 h-20" title="BSU" isFooter />
      </div>
      <span className='-mb-5 text-xs md:text-base'>
        Copyright © 2022 Made with {" "}
        <span className='animate-pulse'>❤️</span> {" "}
        <span className='font-semibold cursor-pointer'>Ferdinan Imanuel Tumanggor</span>
      </span>
    </footer>
  )
}

export default Footer;