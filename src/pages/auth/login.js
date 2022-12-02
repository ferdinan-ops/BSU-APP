import { Brand, Button, Gap, Input } from "../../components";
import { loginAction } from "../../config/redux/actions";
import { unauthPage } from "../../middlewares/authPage";
import { useDispatch, useSelector } from "react-redux";
import { loginBg } from "../../../public";
import { Ring } from "@uiball/loaders";
import Router from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);

  const resetAll = () => {
    setEmail("");
    setPassword("");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    await dispatch(loginAction(formData, resetAll, Router));
  }

  return (
    <section className="flex min-h-screen w-full p-8 font-medium xl:max-h-screen">
      <Head>
        <title>BSU - Masuk</title>
      </Head>
      <div className="relative m-auto flex flex-1 flex-col xl:m-0">
        <div className="top-0 left-0 mb-14 flex flex-col items-center gap-3 font-semibold text-font text-sm md:text-base xl:absolute xl:mb-0 xl:flex-row">
          <Brand title="BSU (Bank Soal UNIKA)" style="h-8 w-8" />
        </div>

        <div className="xl:m-auto">
          <h1 className="text-4xl md:text-[40px] font-bold text-font">Masuk</h1>
          <p className="text-sm md:text-base leading-6 text-gray">
            Silahkan isi data anda untuk mengakses akun Anda
          </p>

          <form className="mt-12 md:mt-14" onSubmit={submitHandler}>
            <Input title="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Gap style="h-5" />
            <Input title="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
            <Gap style="h-[32px]" />
            <div className={`primary-button ${isLoading && "pointer-events-none bg-opacity-40"}`}>
              <Button type="submit">{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Masuk"}</Button>
            </div>
            <Gap style="h-5" />
          </form>

          <p className="mt-5 text-sm md:text-base text-center text-gray">
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
