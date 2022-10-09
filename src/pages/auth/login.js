import Image from "next/image";
import { Brand, Button, Gap, Input } from "../../components";
import Link from "next/link";
import Head from "next/head";
import { google, loginBg } from "../../../public";

export default function Login() {
  return (
    <section className="flex min-h-screen w-full p-8 font-medium xl:max-h-screen">
      <Head>
        <title>BSU - Masuk</title>
      </Head>
      <div className="relative m-auto flex flex-1 flex-col xl:m-0">
        <div className="top-0 left-0 mb-14 flex flex-col items-center gap-3 font-semibold text-font xl:absolute xl:mb-0 xl:flex-row">
          <Brand title="BSU (Bank Soal UNIKA)" style="h-8 w-8" />
        </div>

        <div className="xl:m-auto">
          <h1 className="text-[40px] font-bold text-font">Masuk</h1>
          <p className="text-base leading-6 text-gray">
            Silahkan isi data anda untuk mengakses akun Anda
          </p>

          <form className="mt-14">
            <Input title="Email" type="email" placeholder="Email" />
            <Gap style="h-5" />
            <Input title="Password" type="password" placeholder="Password" />
            <Gap style="h-[32px]" />
            <div className="shadow-button h-11 rounded-lg bg-primary font-semibold text-font">
              <Button>Masuk</Button>
            </div>
            <Gap style="h-5" />
            <div className="h-11 rounded-lg border border-auth text-gray hover:bg-slate-50">
              <Button>
                <Image alt="" src={google} width={24} height={24} />{" "}
                <span className="ml-2">Masuk dengan Google</span>
              </Button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray">
            Belum punya akun?{" "}
            <Link href="/auth/register">
              <a className="text-primary">Daftar</a>
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden w-[47.6%] overflow-hidden rounded-[40px] xl:flex">
        <Image src={loginBg} layout="fill" alt="" objectFit="cover" />
      </div>
    </section>
  );
}
