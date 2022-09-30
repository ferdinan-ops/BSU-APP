import Image from "next/image";
import Link from "next/link";
import React from "react";
import { bell, dummyProfile, plus } from "../../../public";
import { Brand, Button, SearchBar } from "../atoms";

export default function Header() {
  const isLogin = true;

  return (
    <header className="flex h-24 items-center justify-between text-font md:gap-10 xl:gap-0">
      <Link href="/">
        <a className="mx-auto flex items-center gap-[15px] text-2xl font-bold md:mx-0 md:gap-5 md:text-4xl">
          <Brand title="BSU" style="h-[38px] w-[38px] md:h-12 md:w-12" />
        </a>
      </Link>
      <div className="relative hidden w-[53.9%] md:flex">
        <SearchBar />
      </div>

      {isLogin ? (
        <div className="hidden w-[170px] items-center justify-between md:flex">
          <Link href="/notification">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={bell} layout="fill" alt="" />
            </a>
          </Link>
          <Link href="/create">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={plus} layout="fill" alt="" />
            </a>
          </Link>
          <Link href="/profile">
            <a className="relative h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full">
              <Image src={dummyProfile} layout="fill" alt="" />
            </a>
          </Link>
        </div>
      ) : (
        <div className="shadow-button h-[50px] w-[170px] rounded-md bg-primary text-xl font-bold">
          <Button>Masuk</Button>
        </div>
      )}
    </header>
  );
}
