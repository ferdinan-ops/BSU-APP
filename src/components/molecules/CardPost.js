import Image from "next/image";
import Link from "next/link";
import React from "react";
import { liked, message } from "../../../public";
import Moment from "react-moment";
import Router from "next/router";
import { More } from "../atoms";

export default function CardPost({ post }) {
  return (
    <div className="mb-10 w-full rounded-lg border border-[#DCDCDC] text-font">
      <div className="flex items-center justify-between border-b border-[#DCDCDC] p-5">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={() => Router.push(`/profile/${post.user.id}`)}
        >
          <img
            src={post.user.profilePicture}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="font-semibold">
            {post.user.username} &bull;{" "}
            <span className="text-sm text-[#ADADAD]">
              <Moment fromNow>{post.updated_at}</Moment>
            </span>
          </p>
        </div>
        <More />
      </div>

      <div className="card-body p-5">
        <div className="flex flex-col md:flex-row md:gap-7">
          <img
            src={post.image}
            alt=""
            className="h-auto w-full md:max-h-[216px] md:w-auto"
          />
          <div className="ml-0 flex flex-col md:ml-8">
            <h1 className="text-2xl font-semibold">{post.mataKuliah}</h1>
            <table className="mt-5">
              <tbody>
                <tr>
                  <td className="font-semibold">Fakultas</td>
                  <td className="px-4">:</td>
                  <td>{post.fakultas}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Program Studi</td>
                  <td className="px-4">:</td>
                  <td>{post.programStudi}</td>
                </tr>
                <tr>
                  <td className="font-bold">Semester</td>
                  <td className="px-4">:</td>
                  <td>{post.semester}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Kategori</td>
                  <td className="px-4">:</td>
                  <td>{post.kategori}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-[30px] flex gap-5 md:mt-auto">
              <div className="flex items-center gap-2 font-semibold">
                <div className="icon-wrapper bg-[#EB5757]/30">
                  <Image src={liked} alt="" width={15} height={15} />
                </div>
                <p>12</p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <div className="icon-wrapper bg-[#6C5CE7]/30">
                  <Image src={message} alt="" width={15} height={15} />
                </div>
                <p>12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
