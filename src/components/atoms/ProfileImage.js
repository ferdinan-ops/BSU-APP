import React from "react";
import Moment from "react-moment";

export default function ProfileImage({
  user,
  date,
  imgStyle,
  nameStyle,
  isPost,
}) {
  return (
    <div
      className="flex cursor-pointer items-center gap-4"
      onClick={(e) => {
        e.stopPropagation();
        Router.push(`/profile/${user.id}`);
      }}
    >
      <img
        src={user.profilePicture}
        alt=""
        className={`rounded-full ${imgStyle}`}
      />
      <p className={`font-semibold ${nameStyle}`}>
        {user.username}{" "}
        <span className="text-xs text-[#ADADAD] md:text-sm">
          {isPost && "&bull;"} <Moment fromNow>{date}</Moment>
        </span>
      </p>
    </div>
  );
}
