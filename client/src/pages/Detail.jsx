import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getQuestion, likeQuestion, saveQuestion } from '../store/features/questionSlice'
import { privateApi } from '../services'
import { Waveform } from '@uiball/loaders'
import CONFIG from '../constants/environtment'
import moment from 'moment'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import { Button, Info } from '../components/common/atoms'
import { HiBookmark, HiHeart, HiOutlineBookmark, HiOutlineHeart } from 'react-icons/hi2'

const defaultImage = 'https://source.unsplash.com/random/?profile'

const Detail = () => {
  const swiper = useSwiper()
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { loading, question } = useSelector((state) => state.question)
  const {
    userInfo: { _id }
  } = useSelector((state) => state.auth)
  const API = privateApi({ contentType: 'application/json' })

  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [saveCount, setSaveCount] = useState(0)

  useEffect(() => {
    dispatch(getQuestion({ API, id: postId }))
  }, [dispatch])

  console.log({ question, loading })

  if (!loading && !question) {
    console.log('404')
  }

  // if (!loading && !question) return <Navigate to="/404" />

  useEffect(() => {
    setIsLiked(question?.likes?.findIndex((id) => id === String(_id)) !== -1)
    setLikeCount(question?.likes?.length)
  }, [question, _id])

  useEffect(() => {
    setIsSaved(question?.saves?.findIndex((id) => id === String(_id)) !== -1)
    setSaveCount(question?.saves?.length)
  }, [question, _id])

  const handleSwipePerIndex = (index) => {
    if (swiper) {
      swiper.slideTo(index)
    }
  }

  const downloadHandler = async () => {
    const data = question?.images.map((image) => {
      return fetch(CONFIG.imageUrl + image).then((res) => res.blob())
    })
    console.log({ data })
    const blob = await Promise.all(data)
    const zip = new JSZip()
    blob.forEach((blob, index) => {
      zip.file(`${question.mataKuliah}-${index}.jpg`, blob)
    })
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${question.mataKuliah}.zip`)
    })
  }

  const likePostHandler = async () => {
    dispatch(likeQuestion({ API, id: postId }))
    setIsLiked(!isLiked)
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else if (!isLiked) {
      setLikeCount(likeCount + 1)
    }
  }

  const savePostHandler = async () => {
    dispatch(saveQuestion({ API, id: postId }))
    setIsSaved(!isSaved)
    if (isSaved) {
      setSaveCount(saveCount - 1)
    } else if (!isSaved) {
      setSaveCount(saveCount + 1)
    }
  }

  return (
    <>
      {!loading && question ? (
        <div className="mx-auto mt-[35px] w-full text-font md:mt-[60px] md:w-10/12 xl:w-8/12">
          <div className="mb-10">
            <h1 className="text-center text-xl font-bold uppercase md:text-[32px]">{question.mataKuliah}</h1>
            <div className="mt-10 flex items-center justify-center gap-4 md:gap-5">
              {question?.userId?.photo ? (
                <img
                  src={question?.userId?.photo}
                  className="h-8 w-8 rounded-full object-cover md:h-[50px] md:w-[50px]"
                  alt={question?.userId?.username}
                />
              ) : (
                <img
                  src={defaultImage}
                  className="h-8 w-8 rounded-full object-cover md:h-[50px] md:w-[50px]"
                  alt={question?.userId?.username}
                />
              )}
              <div className="flex flex-col text-sm font-semibold md:text-base">
                {question?.userId?.username}
                <span className="text-xs text-[#5C5C5C] md:text-sm">{moment(question.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>

          <Swiper
            modules={[Pagination, Navigation, A11y]}
            slidesPerView={1}
            spaceBetween={40}
            grabCursor={true}
            className="w-8/12 p-6"
          >
            {question?.images.map((image, index) => (
              <SwiperSlide key={index} className="soal-shadow w-full overflow-hidden rounded-xl">
                <img src={CONFIG.imageUrl + image} alt={`${question.mataKuliah}-${index}`} className="w-full" />
              </SwiperSlide>
            ))}
            {question?.images.length > 0 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                {question?.images.map((image, index) => (
                  <button
                    onClick={() => handleSwipePerIndex(index)}
                    key={index}
                    className="group h-[105px] w-[80px] border-2"
                  >
                    <img
                      src={CONFIG.imageUrl + image}
                      alt={`${question.mataKuliah}-${index}`}
                      className="h-full w-full object-cover group-hover:blur-[1px]"
                    />
                  </button>
                ))}
              </div>
            )}
          </Swiper>

          <div className="mx-auto my-10 block w-fit rounded-lg bg-white p-6 shadow-lg">
            <table cellPadding={5}>
              <tbody className="text-xs text-font md:text-base">
                <Info title="Mata Kuliah" content={question.mataKuliah} />
                <Info title="Fakultas" content={question.fakultas} />
                <Info title="Program Studi" content={question.programStudi} />
                <Info title="Tahun Ajaran" content={question.tahunAjaran} />
                <Info title="Semester" content={question.semester} />
                <Info title="Kategori" content={question.kategori} />
                <Info title="Dosen" content={question.dosen} />
              </tbody>
            </table>
            <Button
              onClick={downloadHandler}
              className="mt-2 bg-primary font-semibold text-white hover:bg-primary-hover disabled:bg-primary/60 xl:text-base"
            >
              Download
              {/* <div className="relative mr-2 h-6 w-6 md:h-7 md:w-7">
                  <img src={download} layout="fill" alt="" />
                </div> */}
            </Button>
          </div>

          <div className="flex gap-8">
            <div className="mb-16 flex items-center gap-3 md:gap-5">
              <div className="relative h-7 w-7 cursor-pointer md:h-[30px] md:w-[30px]" onClick={likePostHandler}>
                {isLiked ? <HiHeart /> : <HiOutlineHeart />}
              </div>
              <span className="text-lg font-bold md:text-xl">{likeCount}</span>
            </div>
            <div className="mb-16 flex items-center gap-3 md:gap-5">
              <div className="relative h-7 w-7 cursor-pointer md:h-[26px] md:w-[26px]" onClick={savePostHandler}>
                {isSaved ? <HiBookmark /> : <HiOutlineBookmark />}
              </div>
              <span className="text-lg font-bold md:text-xl">{saveCount}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
        </div>
      )}
    </>
  )
}

export default Detail
