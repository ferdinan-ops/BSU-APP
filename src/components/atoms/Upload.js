import Image from "next/image";
import React, { useRef } from "react";
import { image } from "../../../public";

export default function Upload({ img, ...rest }) {
  const ref = useRef(null);

  return (
    <div>
      <label className="text-sm font-semibold text-font">Upload Gambar</label>
      <div className="mt-2 rounded-lg border-2 border-dashed border-auth p-4">
        {img ? (
          <img src={img} alt="" className="w-full rounded-lg shadow-lg" />
        ) : (
          <div
            className="flex cursor-pointer flex-col items-center justify-center gap-[30px] py-[30px]"
            onClick={() => ref.current.click()}
          >
            <div className="relative h-[61px] w-[70px] shadow-xl">
              <Image src={image} alt="" layout="fill" />
            </div>
            <p className="text-lg font-medium text-[#ADADAD]">
              Tekan icon gambar di atas untuk upload gambar
            </p>
          </div>
        )}
      </div>
      <input type="file" hidden ref={ref} {...rest} />
    </div>
  );
}
