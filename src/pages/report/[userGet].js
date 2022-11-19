import { sendReportAPI } from '../../config/hitApi';
import { Button, Layout } from '../../components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Ring } from '@uiball/loaders';
import toast from 'react-hot-toast';

export default function Report() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { userGet } = router.query;

  const { currentUser } = useSelector((state) => state.authReducer);
  const { _id: userSend } = currentUser;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await sendReportAPI({ userSend, userGet, message });
      setMessage("");
      setIsLoading(false);
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title="BSU - Lapor">
      <section className="text-font my-[30px] md:my-[60px] w-full md:w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-center text-xl md:text-[32px] font-bold uppercase">laporkan Soal ⚠️</h1>
        <div className='mt-[30px] md:mt-[60px] font-medium leading-relaxed'>
          <p>
            Kami menanggapi laporan dengan serius. Jika kami menemukan pelanggaran terhadap peraturan, kami akan memintanya untuk menghapus soal tersebut atau mengunci atau menangguhkan akun tersebut.
          </p>
          <p className='mt-4'>
            Jika ada bahaya langsung, selain membuat laporan, hubungi juga layanan darurat setempat.
          </p>
        </div>
        <form className="flex flex-col text-font mt-[50px]" onSubmit={submitHandler}>
          <label className="text-base md:text-lg font-semibold">Alasan Laporan:</label>
          <textarea
            className="mt-5 h-48 rounded-lg border border-auth p-5 outline-none focus:border-primary text-sm md:text-base"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className={`shadow-button mt-[30px] ml-auto h-11 md:w-48 w-28 rounded-lg bg-primary font-semibold text-font`}>
            <Button type="submit">
              {isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Kirim"}
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  )
}
