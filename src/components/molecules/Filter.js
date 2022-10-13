import React, { useState } from "react";

export default function Filter({ all, setItems, filterItem, menus }) {
  const [filtered, setFiltered] = useState("Semua Soal");

  const filterHandler = (e, fakultas) => {
    e.preventDefault();
    setFiltered(fakultas);
  };

  return (
    <div className="no-scrollbar mt-[30px] flex gap-4 overflow-y-auto md:mt-[60px]">
      <button
        className={`min-w-max cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base 
        ${filtered === "Semua Soal"
            ? "border-transparent bg-primary"
            : "border-primary text-primary"
          }`}
        onClick={(e) => {
          filterHandler(e, "Semua Soal");
          setItems(all);
        }}
      >
        Semua
      </button>
      {menus.map((fakultas, index) => (
        <button
          key={index}
          className={`min-w-max cursor-pointer rounded-full border px-4 py-1 text-[15px] font-semibold md:px-5 md:py-1.5 md:text-base 
          ${filtered === fakultas
              ? "border-transparent bg-primary"
              : "border-primary text-primary"
            }`}
          onClick={(e) => {
            filterHandler(e, fakultas);
            filterItem(fakultas);
          }}
        >
          {fakultas}
        </button>
      ))}
    </div>
  );
}
