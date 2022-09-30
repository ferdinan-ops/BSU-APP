import Image from "next/image";
import { logo } from "../../../public";

export default function Brand({ title, style }) {
  return (
    <>
      <div className={`relative ${style}`}>
        <Image src={logo} alt="" layout="fill" />
      </div>
      <span>{title}</span>
    </>
  );
}
