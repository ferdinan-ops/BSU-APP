import Image from "next/image";
import React, { useState } from "react";
import { deleted, edit, more } from "../../../public";

export default function More() {
  const [show, setShow] = useState(false);

  return (
    <div className="cursor-pointer" onClick={() => setShow(!show)}>
      <div className="icon-wrapper relative transition-all hover:bg-gray/20">
        <Image src={more} alt="" width={15} height={15} />
        {show && (
          <div className="absolute right-0 top-8 flex w-24 flex-col overflow-hidden rounded bg-white">
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
      </div>
    </div>
  );
}
