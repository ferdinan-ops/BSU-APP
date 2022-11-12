import React from "react";
import Moment from "react-moment";
import { More } from "../atoms";
import Router from "next/router";

export default function Author({ user, date, contentId, size }) {
  const linkedHandler = (e, id) => {
    e.stopPropagation();
    Router.push(`/profile/${id}`);
  }

  return (
    <>
      <div className="flex cursor-pointer items-center gap-4" onClick={(e) => linkedHandler(e, user._id)}>
        {user.photo ?
          <img src={user.photo} className={`rounded-full ${size}`} alt="" /> :
          <img src="/images/profile.png" className={`rounded-full ${size}`} alt="" />
        }
        <div className="flex gap-1 text-gray-2 items-center">
          <span className="text-font text-[15px] md:text-base font-semibold">{user.username}</span>&bull;
          <Moment fromNow className="text-xs md:text-sm font-medium">{date}</Moment>
        </div>
      </div>
      <More userId={user._id} contentId={contentId} />
    </>
  );
}
