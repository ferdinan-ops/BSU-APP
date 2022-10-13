import React, { useState } from "react";
import { Button, Dropdown, Gap, Input, Layout, Upload } from "../../components";
import { allFakultas, allSemester } from "../../utils/listData";

export default function Create() {
  const [mataKuliah, setMataKuliah] = useState("");
  const [fakultas, setFakultas] = useState(allFakultas[4]);
  const [programStudi, setProgramStudi] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [semester, setSemester] = useState(allSemester[0]);
  const [imgPreview, setimgPreview] = useState(null);

  const resetFields = () => {
    setMataKuliah("");
    setFakultas(allFakultas[4]);
    setProgramStudi("");
    setTahunAjaran("");
    setSemester(allSemester[0]);
    setimgPreview(null);
  };

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    setimgPreview(URL.createObjectURL(file));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    resetFields();
    alert("masih test");
  };

  return (
    <Layout title="BSU - Create">
      <section className="text-font my-[30px] md:my-[60px] w-full md:w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-center text-xl md:text-[32px] font-bold uppercase">tambahkan soal yang kamu punya 😁</h1>
        <form className="mt-[30px] md:mt-[60px]" onSubmit={submitHandler}>
          <Input value={mataKuliah} title="Mata Kuliah" placeholder="Matematika Diskrit" onChange={(e) => setMataKuliah(e.target.value)} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Dropdown title="Fakultas" listData={allFakultas} selected={fakultas} setSelected={setFakultas} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Input value={programStudi} title="Program Studi" placeholder="Teknik Informatika" onChange={(e) => setProgramStudi(e.target.value)} />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className="flex w-full flex-col md:flex-row gap-[30px]">
            <div className="w-full">
              <Input value={tahunAjaran} title="Tahun Ajaran" placeholder="2020/2021" onChange={(e) => setTahunAjaran(e.target.value)} />
            </div>
            <div className="w-full">
              <Dropdown title="Semester" listData={allSemester} selected={semester} setSelected={setSemester} />
            </div>
          </div>
          <Gap style="h-[30px] md:h-[40px]" />
          <Upload onChange={imageUploadHandler} img={imgPreview} />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className="shadow-button ml-auto h-11 w-28 md:w-48 rounded-lg bg-primary font-semibold text-font">
            <Button type="submit">Kirim</Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
