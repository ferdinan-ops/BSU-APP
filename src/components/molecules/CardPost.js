import Image from "next/image";
import React from "react";
import { liked, message } from "../../../public";
import Moment from "react-moment";
import Router from "next/router";
import { IconWrapper, InfoSoal, More } from "../atoms";

export default function CardPost({ post }) {

  const profileHandler = (e, id) => {
    e.stopPropagation();
    Router.push(`/profile/${id}`);
  }

  const detailHandler = (id) => {
    Router.push(`/detail/${id}`);
  }

  return (
    <div className="mb-10 w-full rounded-lg border border-[#DCDCDC] text-font cursor-pointer hover:bg-slate-50" onClick={() => detailHandler(post.id)}>
      <div className="flex items-center justify-between border-b border-[#DCDCDC] p-5">
        <div className="flex cursor-pointer items-center gap-4" onClick={(e) => profileHandler(e, post.user.id)}>
          <img src={post.user.profilePicture} alt="" className="h-[30px] w-[30px] rounded-full md:h-10 md:w-10" />
          <p className="text-[15px] font-semibold md:text-base">
            {post.user.username}{" "}
            <span className="text-xs text-[#ADADAD] md:text-sm">
              &bull; <Moment fromNow>{post.updated_at}</Moment>
            </span>
          </p>
        </div>
        <More />
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
              <div className="flex items-center gap-2 font-semibold">
                <IconWrapper img={liked} style="bg-[#EB5757]/30" />
                <p>12</p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <IconWrapper img={message} style="bg-[#6C5CE7]/30" />
                <p>12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
