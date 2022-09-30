import React from "react";
import { Brand, Button, HeaderLink, SearchBar } from "../atoms";

export default function Header() {
  const isLogin = true;

  return (
    <header className="flex h-24 items-center justify-between text-font md:gap-10 md:px-6 xl:gap-0 xl:px-0">
      <div className="mx-auto flex items-center gap-[15px] text-2xl font-bold md:mx-0 md:gap-5 md:text-4xl">
        <Brand title="BSU" style="h-[38px] w-[38px] md:h-12 md:w-12" />
      </div>
      <div className="relative hidden w-[53.9%] md:flex">
        <SearchBar />
      </div>

      {isLogin ? (
        <HeaderLink />
      ) : (
        <div className="shadow-button h-[50px] w-[170px] rounded-md bg-primary text-xl font-bold">
          <Button>Masuk</Button>
        </div>
      )}
    </header>
  );
}
