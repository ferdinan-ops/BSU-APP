import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { liked } from "../../../public";
import { Button, Gap, IconWrapper, InfoSoal, Layout } from "../../components";
import { getQuestions, questionSelectors } from "../../config/redux/features";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const question = useSelector((state) =>
    questionSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <Layout title="BSU - Detail">
      {question && (
        <section className="mx-auto mt-[35px] w-8/12 text-font md:mt-[60px]">
          <div className="">
            <h1 className="text-center text-[32px] font-bold uppercase">
              {question.mataKuliah}
            </h1>
            <Gap style="h-10" />
            <div className="flex items-center justify-center gap-5">
              <img
                src={question.user.profilePicture}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <p className="flex flex-col font-semibold">
                {question.user.username}{" "}
                <Moment fromNow className="text-sm text-[#5C5C5C]">
                  {question.updated_at}
                </Moment>
              </p>
            </div>
          </div>
          <Gap style="h-10" />
          <img
            src={question.image}
            alt=""
            className="mx-auto w-full rounded-lg shadow-lg"
          />
          <Gap style="h-10" />
          <table className="mx-auto block w-fit rounded-lg bg-white p-[30px] shadow-lg">
            <tbody className="text-font">
              <InfoSoal title="Mata Kuliah" content={question.mataKuliah} />
              <Gap style="h-3" />
              <InfoSoal title="Fakultas" content={question.fakultas} />
              <Gap style="h-3" />
              <InfoSoal title="Program Studi" content={question.programStudi} />
              <Gap style="h-3" />
              <InfoSoal title="Semester" content={question.semester} />
              <Gap style="h-3" />
              <InfoSoal title="Kategori" content={question.kategori} />
            </tbody>
          </table>
          <Gap style="h-10" />

          <div className="flex items-center gap-5">
            <div className="cursor-pointer">
              <Image src={liked} alt="" width={30} height={30} />
            </div>
            <span className="text-xl font-bold">12k</span>
          </div>
          <Gap style="h-16" />
          <div className="comment">
            <h1 className="border-b-2 border-[#DCDCDC] pb-5 text-2xl font-bold">
              {question.comment.length} Komentar
            </h1>
            <Gap style="h-[50px]" />
            <form className="flex flex-col text-font">
              <label htmlFor="comment" className="text-lg font-semibold">
                Tulis Komentar:
              </label>
              <textarea
                id="comment"
                className="mt-5 h-72 rounded-lg border border-auth p-5 outline-none focus:border-primary"
              />
              <div className="shadow-button mt-[30px] ml-auto h-11 w-48 rounded-lg bg-primary font-semibold text-font">
                <Button type="submit">Kirim</Button>
              </div>
            </form>
          </div>
          <Gap style="h-[100px]" />
        </section>
      )}
    </Layout>
  );
}
