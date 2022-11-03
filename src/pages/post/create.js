import { createPost, imgPreviewHandler, setForm } from "../../config/redux/actions/createPostAction";
import { Button, Dropdown, Gap, Input, Layout, Upload } from "../../components";
import { allFakultas, allSemester, allCategories } from "../../utils/listData";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { authPage } from "../../middlewares/authPage";
import React, { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { Ring } from "@uiball/loaders";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} }
}

export default function Create() {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.authReducer);
  const { form, imgPreview } = useSelector(state => state.createPostReducer);
  const { mataKuliah, fakultas, programStudi, tahunAjaran, semester, kategori, dosen, images, userId, isLoading } = form;

  useEffect(() => {
    dispatch(setForm("userId", currentUser._id));
  }, [dispatch, currentUser]);

  const textFieldHandler = (e) => {
    const { name, value } = e.target;
    dispatch(setForm(name, value));
  }

  const dropdownValue = (name, value) => {
    dispatch(setForm(name, value));
  }

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      if (loading <= 100) {
        setTimeout(() => {
          images.map((image) => {
            const imageRef = ref(storage, `questions/${userId}/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image, "data_url");
            uploadTask.on("state_changed", (snapshot) => {
              const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setLoading(prog);
            }, (err) => console.log(err), async () => {
              await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
                setAllImages((prevState) => [...prevState, urls]);
              })
            })
          });
          resolve(allImages);
        }, 5000);
      } else {
        reject("salah");
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const urls = await uploadImage();
    console.log(urls);
  };

  console.log(loading);
  console.log(images);

  return (
    <Layout title="BSU - Create">
      <section className="text-font my-[30px] md:my-[60px] w-full md:w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-center text-xl md:text-[32px] font-bold uppercase">tambahkan soal yang kamu punya 😁</h1>
        <form className="mt-[30px] md:mt-[60px]" onSubmit={submitHandler}>
          <Input value={mataKuliah} title="Mata Kuliah" placeholder="Matematika Diskrit" name="mataKuliah" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Dropdown title="Fakultas" listData={allFakultas} selected={fakultas} setSelected={(e) => dropdownValue("fakultas", e)} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Input value={programStudi} title="Program Studi" placeholder="Teknik Informatika" name="programStudi" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <Input value={dosen} title="Nama Dosen" placeholder="Budi Harianja, S.Kom, M.Kom" name="dosen" onChange={textFieldHandler} />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className="flex w-full flex-col md:flex-row gap-[30px]">
            <div className="w-full">
              <Input value={tahunAjaran} title="Tahun Ajaran" placeholder="2020/2021" name="tahunAjaran" onChange={textFieldHandler} />
            </div>
            <div className="w-full">
              <Dropdown title="Semester" listData={allSemester} selected={semester} name="semester" setSelected={(e) => dropdownValue("semester", e)} />
            </div>
            <div className="w-full">
              <Dropdown title="Kategori" listData={allCategories} selected={kategori} name="semester" setSelected={(e) => dropdownValue("kategori", e)} />
            </div>
          </div>
          <Gap style="h-[30px] md:h-[40px]" />
          <Upload onChange={(e) => dispatch(imgPreviewHandler(e, imgPreview, images))} images={images} imgPreview={imgPreview} multiple />
          <Gap style="h-[30px] md:h-[40px]" />
          <div className="shadow-button ml-auto h-11 w-28 md:w-48 rounded-lg bg-primary font-semibold text-font">
            <Button type="submit">{isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Kirim"}</Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
