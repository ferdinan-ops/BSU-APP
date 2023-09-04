import { useState } from 'react'
import { FcSearch } from 'react-icons/fc'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useGetQuestionsByKeywordQuery, useGetQuestionsQuery } from '../store/api/questionApi'
import { setSearchPage } from '../store/features/searchSlice'
import { NoData, Pagination, Posts, Section } from '../components'

const Home = () => {
  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  const dispatch = useDispatch()
  const searchPage = useSelector((state) => state.search.page)

  let posts
  if (search) {
    posts = useGetQuestionsByKeywordQuery({ search, page: searchPage })
  } else {
    posts = useGetQuestionsQuery(page)
  }

  const handlePrev = () => {
    if (!search) return setPage(page - 1)
    dispatch(setSearchPage(searchPage - 1))
  }

  const handleNext = () => {
    if (!search) return setPage(page + 1)
    dispatch(setSearchPage(searchPage + 1))
  }

  return (
    <Section title="Beranda" className="z-0 min-h-[calc(100vh-100px)] bg-slate-100 pb-[40px] xl:pb-[60px]">
      <Posts isLoading={posts.isLoading} isSuccess={posts.isSuccess} posts={posts.data} />
      {posts.isSuccess && posts.data?.total_data > 6 && (
        <Pagination handlePrev={handlePrev} handleNext={handleNext} page={search ? searchPage : page} posts={posts} />
      )}
      {posts.isError && posts.error?.status === 404 && (
        <div className="m-auto w-4/12">
          <NoData
            Icon={FcSearch}
            title="Tidak dapat menemukan soal yang kamu cari"
            text={`Maaf, kami sudah mencari kemanapun. ${posts.error?.data.error} Coba cari dengan kata kunci lainnya`}
          />
        </div>
      )}
    </Section>
  )
}

export default Home
