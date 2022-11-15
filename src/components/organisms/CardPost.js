import { liked, message } from "../../../public";
import { Author } from "../molecules";
import { Info, Icon } from "../atoms";
import Router from "next/router";
import React from "react";

export default function CardPost({ post }) {
  const { _id: id, user, createdAt } = post;
  const linkedCard = (id) => Router.push(`/post/${id}`);


  return (
    <div className="mb-10 last:mb-0 w-full cursor-pointer rounded-lg border border-[#DCDCDC] text-font hover:bg-slate-50" onClick={() => linkedCard(id)}>
      <div className="flex items-center justify-between border-b border-[#DCDCDC] p-5">
        <Author user={user} date={createdAt} contentId={id} size="h-[30px] w-[30px] md:h-10 md:w-10" />
      </div>

      <div className="card-body p-5">
        <div className="flex flex-col md:flex-row md:gap-7">
          <img src={post.image} alt="" className="h-auto w-full md:max-h-[216px] md:w-auto" />
          <div className="ml-0 flex flex-col md:ml-8 mt-4 md:mt-0">
            <h1 className="text-xl font-semibold md:text-2xl capitalize">{post.mataKuliah}</h1>
            <table className="mt-5 text-sm md:text-base">
              <tbody>
                <Info title="Fakultas" content={post.fakultas} />
                <Info title="Program Studi" content={post.programStudi} />
                <Info title="Semester" content={post.semester} />
                <Info title="Kategori" content={post.kategori} />
              </tbody>
            </table>

            <div className="mt-[30px] flex gap-5 text-sm md:mt-auto md:text-base">
              <div className="flex items-center gap-3 font-semibold">
                <Icon img={liked} style="bg-[#EB5757]/30" />
                <p>{post.likesCount}</p>
              </div>
              <div className="flex items-center gap-3 font-semibold">
                <Icon img={message} style="bg-[#6C5CE7]/30" />
                <p>{post.commentsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
