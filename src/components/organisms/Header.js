import { getCurrentUser } from "../../config/redux/actions/authAction";
import { bell, dummyProfile, plus } from "../../../public";
import { useDispatch, useSelector } from "react-redux";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../molecules";
import { Brand } from "../atoms";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [top, setTop] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { _id, photo } = currentUser;

  const scrollHandler = () => setTop(window.pageYOffset <= 20);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    scrollHandler();
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);


  return (
    <header className={`fixed top-0 left-0 right-0 z-20 bg-white px-6 md:px-6 xl:px-0 border-b border-slate-200 ${!top && "bg-white bg-opacity-70 backdrop-blur-[5px]"}`}>
      <div className="container mx-auto flex h-20 md:h-24 items-center justify-between text-font md:gap-10 xl:gap-0">
        <Link href="/">
          <a className="flex items-center gap-[15px] text-2xl font-bold md:mx-0 md:gap-5 md:text-4xl">
            <Brand title="BSU" style="h-[38px] w-[38px] md:h-12 md:w-12" />
          </a>
        </Link>

        <div className="block md:hidden cursor-pointer" onClick={() => setShow(!show)}>
          <Bars3Icon className="h-8 w-8 text-font" />
        </div>
        <div className={`-translate-x-full transition-all uppercase fixed top-0 bottom-0 right-0 left-0 bg-primary flex items-center justify-center flex-col text-font font-semibold text-3xl gap-12 ${show && "translate-x-0"}`}>
          <div className="absolute top-4 right-4" onClick={() => setShow(!show)}>
            <XMarkIcon className="h-14 w-14" />
          </div>
          <Link href="/">
            <a className="">Beranda</a>
          </Link>
          <Link href="/post/create">
            <a className="">Tambah Soal</a>
          </Link>
          <Link href="/notification">
            <a className="">Notifikasi</a>
          </Link>
          <Link href={`/profile/${_id}`}>
            <a className="">Profil</a>
          </Link>
          <Link href="/search">
            <a className="">Pencarian</a>
          </Link>
        </div>

        <SearchBar style="hidden w-[53.9%] md:flex" />

        <div className="hidden w-[170px] items-center justify-between md:flex">
          <Link href="/notification">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={bell} layout="fill" alt="" />
            </a>
          </Link>
          <Link href="/post/create">
            <a className="relative h-[25px] w-[25px] cursor-pointer">
              <Image src={plus} layout="fill" alt="" />
            </a>
          </Link>
          <Link href={`/profile/${_id}`}>
            <a className="relative h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full">
              {photo ?
                <Image src={photo} layout="fill" alt="" objectFit="cover" /> :
                <Image src={dummyProfile} layout="fill" alt="" objectFit="cover" />
              }
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
