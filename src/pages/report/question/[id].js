import { sendReport, setMessage } from '../../../config/redux/actions/reportAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Layout } from '../../../components';
import { useRouter } from 'next/router';
import { Ring } from '@uiball/loaders';
import React, { useEffect } from 'react';

export default function ReportQuestion() {
  const router = useRouter();
  const { id: questionId } = router.query;

  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((state) => state.reportReducer);
  const { currentUser } = useSelector((state) => state.authReducer);
  const { _id: userSendId } = currentUser;

  useEffect(() => {
    dispatch(setMessage(""));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const commentId = null;
    dispatch(sendReport({ userSendId, questionId, commentId, message }));
  }

  return (
    <Layout title="BSU - Lapor">
      <section className="text-font my-[30px] md:my-[60px] w-full md:w-10/12 xl:w-8/12 mx-auto">
        <h1 className="text-center text-xl md:text-[32px] font-bold uppercase">laporkan Soal ⚠️</h1>
        <div className='mt-[30px] md:mt-[60px] font-medium leading-relaxed text-sm md:text-base'>
          <p>
            Kami menanggapi laporan dengan serius. Jika kami menemukan pelanggaran terhadap peraturan, kami akan meminta pembuat soal untuk menghapus soal tersebut atau mengunci atau menangguhkan akun tersebut.
          </p>
          <p className='mt-4'>
            Jika ada bahaya langsung, selain membuat laporan, hubungi juga layanan darurat setempat.
          </p>
        </div>
        <form className="flex flex-col text-font mt-[50px]" onSubmit={submitHandler}>
          <label className="text-base md:text-lg font-semibold">Alasan Laporan:</label>
          <textarea
            value={message}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            className="mt-5 h-48 rounded-lg border border-auth p-5 outline-none focus:border-primary text-sm md:text-base"
          />
          <div className={`primary-button mt-[30px] ml-auto md:w-48 w-28`}>
            <Button type="submit">
              {isLoading ? (<Ring size={20} lineWeight={5} speed={2} color="#fff" />) : "Kirim"}
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  )
}
