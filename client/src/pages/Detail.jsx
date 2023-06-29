import { Navigate, useParams } from 'react-router-dom'
import { HiArrowDownTray } from 'react-icons/hi2'
import { Waveform } from '@uiball/loaders'
import moment from 'moment'

import { Avatar, Button, Carousel, Comments, Container, Info, Reaction, Section } from '../components'
import { useGetQuestionQuery } from '../store/api/questionApi'
import { downloadPost } from '../services/questionService'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const Detail = () => {
  const { postId } = useParams()
  const { data: question, isError, isSuccess } = useGetQuestionQuery(postId)
  const { _id } = useSelector((state) => state.auth.userInfo)

  if (isError) return <Navigate to="/404" />

  const handleDownload = () => {
    if (_id) return downloadPost(question)
    toast.error('Anda harus login terlebih dahulu')
  }

  return (
    <>
      {isSuccess ? (
        <Section className="mx-auto my-5 md:my-10 xl:px-0" title={question.data?.mataKuliah}>
          <Container className="flex flex-col gap-5 md:gap-12">
            <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
              <div className="flex flex-col items-center gap-2 md:items-start md:gap-4">
                <h1 className="text-xl font-bold uppercase md:text-[28px]">{question.data?.mataKuliah}</h1>
                <div className="flex items-center gap-2 md:gap-3">
                  <Avatar
                    src={question.data?.user?.photo}
                    alt={question.data?.user?.username}
                    provider={question.data?.user?.provider}
                    size="h-5 w-5 md:h-7 md:w-7"
                  />
                  <div className="flex items-center gap-2 text-[13px] md:gap-3 md:text-base">
                    <p className="font-semibold">{question.data?.user?.username}</p> |
                    <p className="text-font/80">{moment(question.data?.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-5">
                <Reaction question={question.data} />
                <Button onClick={handleDownload} className="gap-2 px-4 shadow-button md:text-[13px]" variant="primary">
                  <HiArrowDownTray className="text-[15px] md:text-base" />
                  Download
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-7 md:flex-row md:items-start md:gap-10">
              <Carousel question={question} />
              <table cellPadding={5} className="block w-fit rounded-lg bg-font p-3 md:p-6">
                <tbody className="text-xs text-white md:text-base">
                  <Info title="Mata Kuliah" content={question.data?.mataKuliah} />
                  <Info title="Fakultas" content={question.data?.fakultas} />
                  <Info title="Program Studi" content={question.data?.programStudi} />
                  <Info title="Tahun Ajaran" content={question.data?.tahunAjaran} />
                  <Info title="Semester" content={question.data?.semester} />
                  <Info title="Kategori" content={question.data?.kategori} />
                  <Info title="Dosen" content={question.data?.dosen} />
                </tbody>
              </table>
            </div>

            <div className="border-t-2 border-slate-200 py-5 xl:py-8">
              <Comments user={question.data?.user} />
            </div>
          </Container>
        </Section>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
        </div>
      )}
    </>
  )
}

export default Detail
