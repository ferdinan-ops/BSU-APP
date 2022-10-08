import React from "react";

export default function InfoSoal({ title, content }) {
  return (
    <tr>
      <td className="font-semibold">{title}</td>
      <td className="px-4">:</td>
      <td className="text-[#5C5C5C]">{content}</td>
    </tr>
  );
}
