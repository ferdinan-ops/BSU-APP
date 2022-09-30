import React from "react";
import { bell, dummyProfile, plus } from "../../../public";
import Image from "next/image";
import Link from "next/link";

export default function HeaderLink() {
  return (
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
        <div className="relative h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full">
          <Image src={dummyProfile} layout="fill" alt="" />
        </div>
      </Link>
    </div>
  );
}
