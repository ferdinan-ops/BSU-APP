import { useEffect } from 'react'
import { useAxios } from '../../../hooks'
import { Waveform } from '@uiball/loaders'
import { Post, Promote } from '../../common/organism'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions } from '../../../store/features/questionSlice'

const Home = () => {
  const dispatch = useDispatch()
  const API = useAxios({ contentType: 'application/json' })
  const { loading, questions } = useSelector((state) => state.question)

  useEffect(() => {
    document.title = 'BSU ~ Home'
  }, [])

  useEffect(() => {
    dispatch(getQuestions(API))
  }, [dispatch])

  let content
  if (loading) {
    content = (
      <div className="flex h-full items-center justify-center">
        <Waveform size={40} lineWeight={3.5} speed={1} color="#ddd" />
      </div>
    )
  } else if (questions) {
    content = questions.map((post) => <Post key={post._id} post={post} />)
  }

  return (
    <section className="z-0 flex min-h-[calc(100vh-100px)] justify-between bg-slate-100">
      <div className="container mx-auto flex gap-20 px-[18px] py-8 xl:px-0 xl:py-[60px]">
        <div className="flex flex-[2.3] flex-col gap-6 xl:gap-8">{content}</div>
        <Promote />
      </div>
    </section>
  )
}

export default Home
