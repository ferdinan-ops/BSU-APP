import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { liked } from "../../../public";
import { Author, Button, Gap, Info, Layout } from "../../components";
import { getQuestions, questionSelectors } from "../../config/redux/features";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const question = useSelector((state) => questionSelectors.selectById(state, id));

  useEffect(() => { dispatch(getQuestions()) }, [dispatch]);

  return (
    <Layout title="BSU - Detail">
      {question && (
        <section className="mx-auto mt-[35px] w-full md:w-10/12 xl:w-8/12 text-font md:mt-[60px]">
          <div className="mb-10">
            <h1 className="text-center md:text-[32px] font-bold uppercase text-xl">{question.mataKuliah}</h1>
            <div className="flex items-center justify-center gap-4 md:gap-5 mt-10">
              <img src={question.user.profilePicture} className="md:h-[50px] md:w-[50px] w-8 h-8 rounded-full" alt="" />
              <p className="flex flex-col font-semibold text-sm md:text-base">
                {question.user.username}
                <Moment fromNow className="text-xs text-[#5C5C5C] md:text-sm">{question.updated_at}</Moment>
              </p>
            </div>
          </div>

          <img src={question.image} className="mx-auto w-full rounded-lg shadow-lg" alt="" />

          <table className="mx-auto block w-fit rounded-lg bg-white p-[30px] shadow-lg my-10">
            <tbody className="text-font text-sm md:text-base">
              <Info title="Mata Kuliah" content={question.mataKuliah} />
              <Gap style="h-3" />
              <Info title="Fakultas" content={question.fakultas} />
              <Gap style="h-3" />
              <Info title="Program Studi" content={question.programStudi} />
              <Gap style="h-3" />
              <Info title="Semester" content={question.semester} />
              <Gap style="h-3" />
              <Info title="Kategori" content={question.kategori} />
            </tbody>
          </table>

          <div className="flex items-center gap-3 md:gap-5 mb-16">
            <div className="cursor-pointer relative md:w-[30px] md:h-[30px] w-7 h-7">
              <Image src={liked} layout="fill" alt="" />
            </div>
            <span className="md:text-xl font-bold text-lg">12k</span>
          </div>

          <div className="comment mb-[100px]">
            <h1 className="border-b-2 border-[#DCDCDC] pb-5 md:text-2xl font-bold text-xl">{question.comment.length} Komentar</h1>

            {question.comment.map(comments => (
              <div className="py-5 border-b-2 border-[#DCDCDC]" key={comments.id}>
                <div className="flex items-center justify-between">
                  <Author user={comments.user} date={comments.updated_at} size="md:w-[35px] md:h-[35px] w-6 h-6" />
                </div>
                <p className="mt-4 leading-relaxed ml-[47px] text-xs md:text-sm">{comments.content}</p>
              </div>
            ))}

            <form className="flex flex-col text-font mt-[50px]">
              <label className="text-base md:text-lg font-semibold">Tulis Komentar:</label>
              <textarea className="mt-5 h-72 rounded-lg border border-auth p-5 outline-none focus:border-primary text-sm md:text-base" />
              <div className="shadow-button mt-[30px] ml-auto h-11 md:w-48 w-28 rounded-lg bg-primary font-semibold text-font">
                <Button type="submit">Kirim</Button>
              </div>
            </form>
          </div>
        </section>
      )}
    </Layout>
  );
}
