import React from "react";

export default function Input({ title, ...rest }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-xs md:text-sm font-semibold text-font">{title}</label>
      <input
        {...rest}
        className="
        h-11 
        rounded-lg 
        border 
        border-auth 
        p-3 
        font-sans 
        text-sm 
        font-normal 
        text-font 
        outline-none 
        placeholder:text-black/50 
        md:text-base md:h-[50px] md:p-4"
        required
      />
    </div>
  );
}
