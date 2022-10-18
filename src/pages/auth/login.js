import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Brand, Button, Gap, Input } from "../../components";
import { auth, provider } from "../../config/firebase";
import { google, loginBg } from "../../../public";
import { Ring } from "@uiball/loaders";
import toast from "react-hot-toast";
import Router from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { createAuth } from "../../functions/auth";
import { useDispatch } from "react-redux";
import { login } from "../../config/redux/features";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const resetField = () => {
    setEmail("");
    setPassword("");
    setIsLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email, !password) {
      setIsLoading(false);
      toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
      return;
    }

    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(login(user));
      console.log(user);
      toast.success("Selamat Anda berhasil Masuk");
      resetField();
      Router.push("/");
    }).catch((error) => {
      toast.error(error.message);
      resetField();
    })
  }

  const loginWGoogleHandler = async (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider).then(({ user }) => {
      const fields = { uid: user.uid, username: user.displayName, email: user.email, photo: user.photoURL };
      createAuth(fields, dispatch, resetField);
      toast.success("Selamat Anda berhasil Masuk");
    }).catch((error) => {
      toast.error(error.message);
      resetField();
    })
  }

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

          <form className="mt-14" onSubmit={handleSubmit}>
            <Input title="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Gap style="h-5" />
            <Input title="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
            <Gap style="h-[32px]" />
            <div className="shadow-button h-11 rounded-lg bg-primary font-semibold text-font">
              <Button type="submit">{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Masuk"}</Button>
            </div>
            <Gap style="h-5" />
          </form>

          <div className="h-11 rounded-lg border border-auth text-gray hover:bg-slate-50">
            <Button onClick={loginWGoogleHandler}>
              <Image alt="" src={google} width={24} height={24} />{" "}
              <span className="ml-2">Masuk dengan Google</span>
            </Button>
          </div>

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
