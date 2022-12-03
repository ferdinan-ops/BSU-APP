import { getMataKuliah } from "../../config/redux/actions/postAction";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { search } from "../../../public";
import Router from "next/router";
import Image from "next/image";

export default function SearchBar({ isMobile, style }) {
  const [keyword, setKeyword] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);

  const dispatch = useDispatch();
  const { allMataKuliah } = useSelector((state) => state.postReducer);
  useEffect(() => { dispatch(getMataKuliah()) }, [dispatch]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (!keyword) return Router.push("/");
    Router.push(`/search/${keyword}`);
  }

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setKeyword(searchWord);
    const newFilter = allMataKuliah.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setAutoComplete([]);
    } else {
      setAutoComplete(newFilter);
    }
  }

  return (
    <div className={`relative ${style} `}>
      <form
        className={`flex h-[50px] border-2 w-full items-center gap-5 focus:rounded-lg focus:bg-white 
        ${keyword.length > 0 ? "border-primary bg-white" : "bg-[#EFEFEF] border-[#EFEFEF]"}
        ${isMobile ? "rounded" : "rounded-full"}`}
        onSubmit={searchHandler}
      >
        <div className="ml-[18px] flex items-center">
          <Image width={24} height={24} alt="" src={search} />
        </div>
        <input
          placeholder="Cari soal"
          className="bg-transparent w-full text-lg font-medium outline-none placeholder:text-[#BBBBBB]"
          value={keyword}
          onChange={handleFilter}
        />
      </form>

      {keyword.length !== 0 && (
        <ul className={`absolute text-sm md:text-base top-full mt-1 bg-white w-full font-semibold text-font ${!isMobile && "p-2 shadow-lg rounded-lg "}`}>
          {autoComplete.length > 0 ? (
            autoComplete.slice(0, 5).map((value, key) => (
              <li
                className="group px-6 py-3 md:py-4 md:px-6 hover:bg-primary hover:text-white rounded cursor-pointer flex gap-5"
                key={key}
                onClick={() => Router.push(`/search/${value}`)}
              >
                <MagnifyingGlassIcon className="w-4 md:w-5 text-font group-hover:text-white" />
                {value}
              </li>
            ))
          ) : (
            keyword && (
              <li className="px-6 py-3 md:py-4 md:px-6 rounded italic cursor-pointer flex gap-5 text-font">
                Tidak ada hasil pencarian
              </li>
            )
          )}
        </ul>
      )}
    </div >
  );
}
