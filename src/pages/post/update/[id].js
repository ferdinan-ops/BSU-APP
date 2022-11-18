import { getQuestionByIdUpdate, setForm, setIsLoading, updateQuestion, uploadUpdated } from "../../../config/redux/actions/postAction";
import { Button, Dropdown, Gap, Input, Layout, Upload } from "../../../components";
import { allFakultas, allSemester, allCategories } from "../../../utils/listData";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../../../middlewares/authPage";
import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} }
}

export default function Update() {
  const [files, setFiles] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { form, isLoading } = useSelector((state) => state.postReducer);
  const { mataKuliah, fakultas, programStudi, tahunAjaran, semester, kategori, dosen, images, userId, imgUpdated } = form;

  useEffect(() => { dispatch(getQuestionByIdUpdate(id)) }, [dispatch, id]);
  useEffect(() => { if (imgUpdated) setFiles(imgUpdated) }, [imgUpdated]);

  const textFieldHandler = (e) => dispatch(setForm(e.target.name, e.target.value))
  const dropdownValue = (name, value) => dispatch(setForm(name, value));

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFiles((oldArr) => [...oldArr, reader.result]);
      }
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (images.length < 0) return toast.error("Mohon upload gambar soal Anda");
    dispatch(setIsLoading(true));
    await uploadUpdated(images, files, userId, mataKuliah, imgUpdated);
    console.log({ images });
    dispatch(setIsLoading(false));
    await dispatch(updateQuestion(id, form, router));
    console.log("gagal");
  };

  return (
    <Layout title="BSU - Ubah Soal">
      <section className="text-font my-[30px] md:my-[60px] w-full md:w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-center text-xl md:text-[32px] font-bold uppercase">Ubah Soal</h1>
        <form className="mt-[30px] md:mt-[60px]" onSubmit={submitHandler}>
          <Input value={mataKuliah} title="Mata Kuliah" placeholder="Matematika Diskrit" name="mataKuliah" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Dropdown title="Fakultas" listData={allFakultas} selected={fakultas} setSelected={(e) => dropdownValue("fakultas", e)} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Input value={programStudi} title="Program Studi" placeholder="Teknik Informatika" name="programStudi" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Input value={dosen} title="Nama Dosen" placeholder="Budi Harianja, S.Kom, M.Kom" name="dosen" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className="flex w-full flex-col md:flex-row gap-[30px]">
            <div className="w-full">
              <Input value={tahunAjaran} title="Tahun Ajaran" placeholder="2020/2021" name="tahunAjaran" onChange={textFieldHandler} />
            </div>
            <div className="w-full">
              <Dropdown title="Semester" listData={allSemester} selected={semester} name="semester" setSelected={(e) => dropdownValue("semester", e)} />
            </div>
            <div className="w-full">
              <Dropdown title="Kategori" listData={allCategories} selected={kategori} name="semester" setSelected={(e) => dropdownValue("kategori", e)} />
            </div>
          </div>
          <Gap style="h-[30px] md:h-[40px]" />
          <Upload onChange={imageHandler} files={files} setFiles={setFiles} multiple />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className={`shadow-button ml-auto h-11 w-28 md:w-48 rounded-lg bg-primary font-semibold text-font ${isLoading && "pointer-events-none bg-opacity-40"}`}>
            <Button type="submit">{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Kirim"}</Button>
          </div>
        </form>
      </section>
    </Layout >
  );
}