import { HiArrowDownTray, HiLockClosed } from 'react-icons/hi2'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Waveform } from '@uiball/loaders'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

import { Avatar, Button, Carousel, Comments, Container, Description, Reaction, Section } from '../components'
import { useGetQuestionQuery } from '../store/api/questionApi'
import { downloadPost } from '../services/questionService'
import * as formatDate from '../services/formatDate'

const Detail = () => {
  const { postId } = useParams()
  const { data: question, isError, isSuccess } = useGetQuestionQuery(postId)
  const user = useSelector((state) => state.auth.userInfo)

  if (isError) return <Navigate to="/404" />

  if (!isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
      </div>
    )
  }

  const handleDownload = () => {
    if (user) return downloadPost(question)
    toast.error('Anda harus login terlebih dahulu')
  }

  return (
    <Section className="mx-auto mb-10 mt-5 md:mb-20 md:mt-10 xl:px-0" title={question.data?.mataKuliah}>
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
                <Link to={`/user/${question.data?.user?._id}`} className="font-semibold hover:text-primary">
                  {question.data?.user?.username}
                </Link>{' '}
                |<p className="text-font/80">{formatDate.fromNow(question.data?.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[15px] md:gap-5 md:text-base">
            <Reaction question={question.data} />
            <Button onClick={handleDownload} className="gap-2 px-4 shadow-button" variant="primary" disabled={!user}>
              {user ? <HiArrowDownTray /> : <HiLockClosed />}
              <span className="text-xs md:text-[13px]">{user ? 'Download' : 'Masuk untuk download'}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-7 md:flex-row md:items-start md:gap-10">
          <Carousel question={question} />
          <Description question={question.data} />
        </div>

        <div className="border-t-2 border-slate-200 py-5 xl:py-8">
          <Comments question={question.data} />
        </div>
      </Container>
    </Section>
  )
}

export default Detail
