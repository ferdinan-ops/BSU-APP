import React from 'react'
import Moment from 'react-moment';
import { More } from '../atoms';

export default function ProfileHeader({ user, date }) {
  return (
    <>
      <div className="flex cursor-pointer items-center gap-4" onClick={(e) => {
        e.stopPropagation();
        Router.push(`/profile/${user.id}`);
      }}>
        <img src={user.profilePicture} alt="" className="h-[30px] w-[30px] rounded-full md:h-10 md:w-10" />
        <p className="text-[15px] font-semibold md:text-base">
          {user.username}{" "}
          <span className="text-xs text-[#ADADAD] md:text-sm">
            &bull; <Moment fromNow>{date}</Moment>
          </span>
        </p>
      </div>
      <More />
    </>
  )
}
