import { getMataKuliah } from "../../config/redux/actions/postAction";
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
        className={`flex h-[50px] w-full items-center gap-5 ${autoComplete.length === 0 ? "rounded-full bg-[#EFEFEF]" : "rounded-lg bg-white border-primary border-2"} ${isMobile && "shadow-lg"}`}
        onSubmit={searchHandler}
      >
        <div className="ml-[18px] flex items-center">
          <Image width={24} height={24} alt="" src={search} />
        </div>
        <input
          placeholder="Cari soal berdasarkan mata kuliah"
          className="bg-transparent w-full text-lg font-medium outline-none placeholder:text-[#BBBBBB]"
          value={keyword}
          onChange={handleFilter}
        />
      </form>

      {autoComplete.length !== 0 && (
        <ul className='absolute top-full mt-1 bg-white rounded-lg w-full shadow-lg font-semibold text-font p-2'>
          {autoComplete.slice(0, 5).map((value, key) => (
            <li
              className='py-4 px-6 hover:bg-primary hover:text-white rounded-sm cursor-pointer'
              key={key}
              onClick={() => Router.push(`/search/${value}`)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
