import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleted, edit, lapor, more } from "../../../public";
import Icon from "./Icon";

export default function More({ userId, contentId, isComment }) {
  const { currentUser } = useSelector(state => state.authReducer);
  const [show, setShow] = useState(false);

  const showHandler = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const updateHandler = (e) => {
    e.stopPropagation();
    if (!isComment) return Router.push(`/post/update/${contentId}`);
    alert("masih test comment");
  }

  const deleteHandler = (e) => {
    e.stopPropagation();
    const ask = confirm("Apakah Anda yakin ingin menghapus?");
    if (ask) {
      if (!isComment) return alert("masih test hapus post");
      alert("masih test comment");
    }
  }

  return (
    <div className="cursor-pointer" onClick={showHandler}>
      <Icon img={more} style="relative transition-all hover:bg-gray/20">
        {show && (
          <div className="absolute right-0 top-8 flex w-24 flex-col overflow-hidden rounded bg-white shadow-md">
            {userId === currentUser._id ? (
              <>
                <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10" onClick={updateHandler}>
                  <Image src={edit} alt="" width={15} height={15} />
                  <span className="pl-2">Ubah</span>
                </div>
                <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10" onClick={deleteHandler}>
                  <Image src={deleted} alt="" width={15} height={15} />
                  <span className="pl-2">Hapus</span>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10">
                <Image src={lapor} alt="" width={15} height={15} />
                <span className="pl-2">Lapor</span>
              </div>
            )}
          </div>
        )}
      </Icon>
    </div>
  );
}
