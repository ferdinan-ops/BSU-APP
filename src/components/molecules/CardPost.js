import React from "react";
import { liked, message } from "../../../public";
import Router from "next/router";
import { IconWrapper, InfoSoal } from "../atoms";
import ProfileHeader from "./ProfileHeader";

export default function CardPost({ post }) {
  const { id, user, updated_at } = post;

  return (
    <div className="mb-10 w-full rounded-lg border border-[#DCDCDC] text-font cursor-pointer hover:bg-slate-50" onClick={() => Router.push(`/detail/${id}`)}>
      <div className="flex items-center justify-between border-b border-[#DCDCDC] p-5">
        <ProfileHeader user={user} date={updated_at} />
      </div>

      <div className="card-body p-5">
        <div className="flex flex-col md:flex-row md:gap-7">
          <img src={post.image} alt="" className="h-auto w-full md:max-h-[216px] md:w-auto" />
          <div className="ml-0 flex flex-col md:ml-8">
            <h1 className="text-xl font-semibold md:text-2xl">{post.mataKuliah}</h1>
            <table className="mt-5 text-sm md:text-base">
              <tbody>
                <InfoSoal title="Fakultas" content={post.fakultas} />
                <InfoSoal title="Program Studi" content={post.programStudi} />
                <InfoSoal title="Semester" content={post.semester} />
                <InfoSoal title="Kategori" content={post.kategori} />
              </tbody>
            </table>

            <div className="mt-[30px] flex gap-5 text-sm md:mt-auto md:text-base">
              <div className="flex items-center gap-3 font-semibold">
                <IconWrapper img={liked} style="bg-[#EB5757]/30" />
                <p>12</p>
              </div>
              <div className="flex items-center gap-3 font-semibold">
                <IconWrapper img={message} style="bg-[#6C5CE7]/30" />
                <p>{post.comment.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
