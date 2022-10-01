import Image from "next/image";
import Link from "next/link";
import React from "react";
import { liked, message } from "../../../public";
import Moment from "react-moment";

export default function CardPost({ post }) {
  return (
    <div className="mb-10 w-full rounded-lg border border-[#DCDCDC] text-font xl:w-7/12">
      <div className="flex items-center justify-between border-b border-[#DCDCDC] p-5">
        <Link href="/">
          <a className="flex items-center gap-4">
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
          </a>
        </Link>
        <p>more</p>
      </div>

      <div className="card-body p-5">
        <div className="flex flex-col md:flex-row">
          <img
            src={post.image}
            alt=""
            className="w-full md:h-[216px] md:max-h-[216px] md:w-0"
          />

          <div className="ml-0 flex flex-col md:ml-8">
            <h1 className="text-2xl font-semibold">{post.mataKuliah}</h1>
            <table className="mt-5">
              <tr>
                <td className="font-semibold">Fakultas</td>
                <td>:</td>
                <td>{post.fakultas}</td>
              </tr>
              <tr>
                <td className="font-semibold">Program Studi</td>
                <td>:</td>
                <td>{post.programStudi}</td>
              </tr>
              <tr>
                <td className="font-bold">Semester</td>
                <td>:</td>
                <td>{post.semester}</td>
              </tr>
              <tr>
                <td className="font-semibold">Kategori</td>
                <td>:</td>
                <td>{post.kategori}</td>
              </tr>
            </table>

            <div className="mt-[30px] flex gap-5 md:mt-auto">
              <div className="flex items-center gap-2 font-semibold">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#EB5757]/30">
                  <Image src={liked} alt="" width={15} height={15} />
                </div>
                <p>12</p>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#6C5CE7]/30">
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
