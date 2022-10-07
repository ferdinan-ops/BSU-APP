import React from "react";

export default function Input({ title, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-semibold text-font">{title}</label>
      <input
        {...rest}
        className="h-[50px] rounded-lg border border-auth p-4 font-sans text-base font-normal text-font outline-none placeholder:text-black/50"
      />
    </div>
  );
}
