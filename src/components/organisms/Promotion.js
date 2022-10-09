import Router from "next/router";
import React from "react";

export default function Promotion() {
  const linkedHandler = (e) => {
    e.preventDefault()
    Router.push("/post/create")
  }

  return (
    <aside className="card-shadow relative h-full w-full items-center justify-center rounded-lg bg-primary p-[30px]">
      <div className="flex h-full flex-col items-center justify-between">
        <h1 className="text-center text-2xl font-bold text-white">
          Ayo tambahkan soal yang kamu punya !
        </h1>
        <div className="z-10 flex">
          <img src="/images/login-promote.png" alt="" className="h-60" />
        </div>
        <button className="w-full rounded-full bg-white py-2 text-xl font-semibold text-primary hover:bg-slate-100" onClick={linkedHandler}>
          Tambahkan Soal
        </button>
      </div>

      <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-white blur-[100px]"></div>
    </aside>
  );
}
