import Image from "next/image";
import Link from "next/link";
import React from "react";
import { bell, dummyProfile, plus } from "../../../public";
import { Brand, Button } from "../atoms";
import { SearchBar } from "../molecules";

export default function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white px-6 md:px-6 xl:px-0">
      <div className="container mx-auto flex h-24 items-center justify-between text-font md:gap-10 xl:gap-0">
        <Link href="/">
          <a className="mx-auto flex items-center gap-[15px] text-2xl font-bold md:mx-0 md:gap-5 md:text-4xl">
            <Brand title="BSU" style="h-[38px] w-[38px] md:h-12 md:w-12" />
          </a>
        </Link>
        <div className="relative hidden w-[53.9%] md:flex">
          <SearchBar />
        </div>

        <div className="hidden w-[170px] items-center justify-between md:flex">
          <Link href="/notification">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={bell} layout="fill" alt="" />
            </a>
          </Link>
          <Link href="/post/create">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={plus} layout="fill" alt="" />
            </a>
          </Link>
          <Link href="/profile/1">
            <a className="relative h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full">
              <Image src={dummyProfile} layout="fill" alt="" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
