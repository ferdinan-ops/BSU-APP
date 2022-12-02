import { deleteComment, setFormComment, setIsEdit } from "../../config/redux/actions/commentAction";
import { deleteQuestion } from "../../config/redux/actions/postAction";
import { deleted, edit, lapor, more } from "../../../public";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import Icon from "./Icon";

export default function More({ userId, contentId, isComment }) {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { questionId } = useSelector(state => state.commentReducer);

  const showHandler = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const updateHandler = () => {
    if (!isComment) return Router.push(`/post/update/${contentId}`);
    dispatch(setIsEdit(contentId._id));
    dispatch(setFormComment(contentId.comment));
  }

  const deleteHandler = () => {
    const ask = confirm("Apakah Anda yakin ingin menghapus?");
    if (ask) {
      if (!isComment) return dispatch(deleteQuestion(contentId));
      dispatch(deleteComment(questionId, contentId._id));
    }
  }

  const reportHandler = () => {
    if (!isComment) return Router.push(`/report/question/${contentId}`);
    Router.push(`/report/comment/${contentId._id}`);
  }

  return (
    <div className="cursor-pointer" onClick={showHandler}>
      <Icon img={more} style="relative transition-all hover:bg-gray/20">
        {show && (
          <div className="absolute z-[999] right-0 top-8 flex w-24 flex-col overflow-hidden rounded bg-white shadow-md">
            {userId === currentUser._id ? (
              <>
                <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10" onClick={updateHandler}>
                  <Image src={edit} alt="" width={15} height={15} />
                  <span className="pl-2">Ubah</span>
                </div>
                <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10" onClick={deleteHandler}>
                  <Image src={deleted} alt="" width={15} height={15} />
                  <span className="pl-2">Hapus</span>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center py-2 pl-2.5 hover:bg-gray/10" onClick={reportHandler}>
                <Image src={lapor} alt="" width={15} height={15} />
                <span className="pl-2">Lapor</span>
              </div>
            )}
          </div>
        )}
      </Icon>
    </div>
  );
}
