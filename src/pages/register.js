import { registerBg } from "../../public";
import Image from "next/image";
import { Brand, Button, Gap, Input } from "../components";
import Link from "next/link";

export default function Register() {
  return (
    <section className="flex min-h-screen w-full p-8 font-medium xl:max-h-screen">
      <div className="relative m-auto flex flex-1 flex-col xl:m-0">
        <div className="top-0 left-0 mb-14 flex flex-col items-center gap-3 font-semibold text-font xl:absolute xl:mb-0 xl:flex-row">
          <Brand title="BSU (Bank Soal UNIKA)" style="h-8 w-8" />
        </div>

        <div className="xl:m-auto">
          <h1 className="text-[40px] font-bold text-font">Daftar</h1>
          <p className="text-base leading-6 text-gray">
            Silahkan isi data anda untuk membuat akun Anda
          </p>

          <form className="mt-14">
            <Input title="Username" placeholder="Username" />
            <Gap height={20} />
            <Input title="Email" type="email" placeholder="Email" />
            <Gap height={20} />
            <Input title="Password" type="password" placeholder="Password" />
            <Gap height={32} />
            <div className="h-11 rounded-lg bg-primary font-semibold text-font">
              <Button>Daftar</Button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray">
            Sudah punya akun?{" "}
            <Link href="/login">
              <a className="text-primary">Masuk</a>
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden w-[47.6%] overflow-hidden rounded-[40px] xl:flex">
        <Image src={registerBg} layout="fill" alt="" objectFit="cover" />
      </div>
    </section>
  );
}
