import React from "react";
import { Button, Gap, Gapping, Input, Layout } from "../components";

export default function Create() {
  return (
    <Layout title="BSU - Create">
      <section className="mt-[30px] text-font md:mt-[60px]">
        <h1 className="text-center text-[32px] font-bold uppercase">
          tambahkan soal yang kamu punya 😁
        </h1>
        <Gap height={60} />
        <form className="mx-auto w-8/12">
          <Input title="Mata Kuliah" placeholder="Matematika Diskrit" />
          <Gapping style="h-[30px] md:h-[40px]" />
          <Input title="Fakultas" placeholder="Ilmu Komputer" />
          <Gapping style="h-[30px] md:h-[40px]" />
          <Input title="Program Studi" placeholder="Teknik Informatika" />
          <Gapping style="h-[30px] md:h-[40px]" />
          <div className="flex w-full gap-[30px]">
            <div className="w-full">
              <Input title="Tahun Ajaran" placeholder="2020/2021" />
            </div>
            <div className="w-full">
              <Input title="Semester" placeholder="2020/2021" />
            </div>
          </div>
          <Gapping style="h-[30px] md:h-[40px]" />
          <div className="shadow-button ml-auto h-11 w-fit rounded-lg bg-primary px-[71px] font-semibold text-font">
            <Button>Buat</Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
