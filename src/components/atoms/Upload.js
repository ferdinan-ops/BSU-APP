import Image from "next/image";
import React, { useRef } from "react";
import { cross, image } from "../../../public";
import IconWrapper from "./Icon";

export default function Upload({ files, setFiles, ...rest }) {
  const ref = useRef(null);

  const deleteHandler = (id) => {
    const newImages = files.filter((item, index) => index !== id);
    setFiles(newImages);
  }

  return (
    <div>
      <label className="text-sm font-semibold text-font">Upload Gambar</label>
      <div className="mt-2 rounded-lg border-2 border-dashed border-auth p-4">
        {files.length > 0 ?
          (
            <div className="flex gap-5">
              {files.map((image, id) => (
                <div key={id} className="relative">
                  <img src={image} alt="" className="w-full rounded-lg shadow-lg" />
                  <IconWrapper img={cross} style="bg-[#EB5757] p-2 cursor-pointer absolute -top-3 -right-3" onClick={deleteHandler.bind(this, id)} />
                </div>
              ))}
              <div className="w-full flex items-center justify-center rounded-lg shadow cursor-pointer bg-font" onClick={() => ref.current.click()}>
                <div className="relative w-1/3 h-1/3">
                  <Image src={image} alt="" layout="fill" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex cursor-pointer flex-col items-center justify-center gap-[30px] py-[30px]" onClick={() => ref.current.click()}>
              <div className="relative h-[51px] w-[60px] md:h-[61px] md:w-[70px] shadow-xl -z-[5]">
                <Image src={image} alt="" layout="fill" />
              </div>
              <p className="md:text-lg font-medium text-[#ADADAD] text-sm text-center">Tekan icon gambar di atas untuk upload gambar</p>
            </div>
          )}
      </div>
      <input type="file" hidden ref={ref} accept="image/*" {...rest} />
    </div>
  );
}
