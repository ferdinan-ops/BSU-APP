import Image from "next/image";
import { logo } from "../../../public";
import { footerLogo } from "../../../public";

export default function Brand({ title, style, isFooter }) {
  return (
    <>
      <div className={`relative ${style}`}>
        <Image src={isFooter ? footerLogo : logo} alt="" layout="fill" />
      </div>
      <span>{title}</span>
    </>
  );
}
