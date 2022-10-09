import Image from "next/image";
import React, { useState } from "react";
import { deleted, edit, more } from "../../../public";
import Icon from "./Icon";

export default function More() {
  const [show, setShow] = useState(false);

  const showHandler = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  return (
    <div className="cursor-pointer" onClick={showHandler}>
      <Icon img={more} style="relative transition-all hover:bg-gray/20">
        {show && (
          <div className="absolute right-0 top-8 flex w-24 flex-col overflow-hidden rounded bg-white shadow-md">
            <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10">
              <Image src={edit} alt="" width={15} height={15} />
              <span className="pl-2">Ubah</span>
            </div>
            <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10">
              <Image src={deleted} alt="" width={15} height={15} />
              <span className="pl-2">Hapus</span>
            </div>
          </div>
        )}
      </Icon>
    </div>
  );
}
