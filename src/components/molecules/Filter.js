import React, { useState } from "react";
import { allFakultas } from "../../utils/listData";

export default function Filter() {
  const [filtered, setFiltered] = useState("Semua Soal");

  const filterHandler = (e, fakultas) => {
    e.preventDefault();
    setFiltered(fakultas);
  };

  return (
    <div className="no-scrollbar mt-[30px] flex gap-4 overflow-y-auto md:mt-[60px]">
      <button
        className={`min-w-max cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base ${
          filtered === "Semua Soal"
            ? "border-transparent bg-primary"
            : "border-primary text-primary"
        }`}
        onClick={(e) => filterHandler(e, "Semua Soal")}
      >
        Semua
      </button>
      {allFakultas.map((fakultas, index) => (
        <button
          key={index}
          className={`min-w-max cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base ${
            filtered === fakultas
              ? "border-transparent bg-primary"
              : "border-primary text-primary"
          }`}
          onClick={(e) => filterHandler(e, fakultas)}
        >
          {fakultas}
        </button>
      ))}
    </div>
  );
}
