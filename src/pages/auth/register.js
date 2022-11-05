import { Brand, Button, Gap, Input } from "../../components";
import { registerAction } from "../../config/redux/actions";
import { unauthPage } from "../../middlewares/authPage";
import { useDispatch, useSelector } from "react-redux";
import { registerBg } from "../../../public";
import { Ring } from '@uiball/loaders';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);

  const resetAll = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = { username, email, password };
    await dispatch(registerAction(formData, resetAll, router));
  }

  return (
    <section className="flex min-h-screen w-full p-8 font-medium xl:max-h-screen">
      <Head>
        <title>BSU - Daftar</title>
      </Head>
      <div className="relative m-auto flex flex-1 flex-col xl:m-0">
        <div className="top-0 left-0 mb-14 flex flex-col items-center gap-3 font-semibold text-font xl:absolute xl:mb-0 xl:flex-row">
          <Brand title="BSU (Bank Soal UNIKA)" style="h-8 w-8" />
        </div>

        <div className="xl:m-auto">
          <h1 className="text-[40px] font-bold text-font">Daftar</h1>
          <p className="text-base leading-6 text-gray">
            Silahkan isi data anda untuk membuat akun Anda
          </p>

          <form className="mt-14" onSubmit={submitHandler}>
            <Input title="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Gap style="h-5" />
            <Input title="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Gap style="h-5" />
            <Input title="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
            <Gap style="h-[32px]" />
            <div className={`h-11 rounded-lg bg-primary font-semibold text-font ${isLoading && "pointer-events-none bg-opacity-40"}`}>
              <Button type="submit">{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Daftar"}</Button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray">
            Sudah punya akun?{" "}
            <Link href="/auth/login">
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
