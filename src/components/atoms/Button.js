import React from "react";

export default function Button({ children, ...rest }) {
  return (
    <button
      className="flex h-full w-full cursor-pointer items-center justify-center"
      {...rest}
    >
      {children}
    </button>
  );
}
