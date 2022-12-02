import { dummyProfile } from "../../../public";
import Moment from "react-moment";
import Router from "next/router";
import { More } from "../atoms";
import Image from "next/image";
import React from "react";

export default function Author({ user, date, contentId, size, isComment }) {
  const linkedHandler = (e, id) => {
    e.stopPropagation();
    Router.push(`/profile/${id}`);
  }

  return (
    <>
      <div className="flex cursor-pointer items-center gap-4" onClick={(e) => linkedHandler(e, user._id)}>
        <div className={`relative rounded-full overflow-hidden ${size}`}>
          {user?.photo ?
            <Image src={user?.photo} layout="fill" objectFit="cover" alt="profile" /> :
            <Image src={dummyProfile} layout="fill" objectFit="cover" alt="profile" />
          }
        </div>
        <div className="flex gap-1 text-gray-2 items-center max-w-[200px] md:max-w-none truncate">
          <span className="text-font text-[15px] md:text-base font-semibold">{user?.username}</span>&bull;
          <Moment fromNow className="text-xs md:text-sm font-medium truncate">{date}</Moment>
        </div>
      </div>
      <More userId={user?._id} contentId={contentId} isComment={isComment} />
    </>
  );
}
