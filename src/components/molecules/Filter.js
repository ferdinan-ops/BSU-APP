import React, { useState } from "react";

export default function Filter() {
  const [filtered, setFiltered] = useState("Semua Soal");

  const filterHandler = (e, fakultas) => {
    e.preventDefault();
    setFiltered(fakultas);
  };

  const allFakultas = [
    "Ekonomi",
    "Sastra",
    "Teknik",
    "Hukum",
    "Pertanian",
    "Filsafat",
    "FIKOM",
    "FKIP",
  ];

  return (
    <div className="mt-[30px] flex flex-row gap-5 overflow-y-auto md:mt-[60px] md:mb-[30px]">
      <button
        className={`cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base ${
          filtered === "Semua Soal"
            ? "border-transparent bg-primary"
            : "border-primary text-primary"
        }`}
        onClick={(e) => filterHandler(e, "Semua Soal")}
      >
        Semua
      </button>

      {allFakultas.map((fakultas) => (
        <div key={fakultas}>
          <button
            className={`cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base ${
              filtered === fakultas
                ? "border-transparent bg-primary"
                : "border-primary text-primary"
            }`}
            onClick={(e) => filterHandler(e, fakultas)}
          >
            {fakultas}
          </button>
        </div>
      ))}
    </div>
  );
}
