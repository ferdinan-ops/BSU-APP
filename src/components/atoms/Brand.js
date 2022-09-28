import Image from "next/image";
import { logo } from "../../../public";

export default function Brand({ fill, title }) {
  return (
    <>
      <Image src={logo} alt="" width={fill} height={fill} />
      <span>{title}</span>
    </>
  );
}
