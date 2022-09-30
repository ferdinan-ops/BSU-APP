import React from "react";
import Image from "next/image";
import { search } from "../../../public";

export default function SearchBar() {
  return (
    <div className="flex h-[50px] w-full items-center gap-5 rounded-full bg-[#EFEFEF]">
      <div className="ml-[18px] flex items-center">
        <Image width={24} height={24} alt="" src={search} />
      </div>
      <input
        placeholder="Cari Soal..."
        className="bg-transparent text-lg font-semibold outline-none placeholder:text-[#BBBBBB]"
      />
    </div>
  );
}
