import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Button } from '../atoms'

const Pagination = ({ handlePrev, handleNext, posts, page }) => {
  const totalPage = Math.ceil(posts.data?.total_data / 6)

  return (
    <div className="mt-10 flex items-center justify-center gap-5">
      <Button variant="primary" className="px-3" onClick={handlePrev} disabled={page === 1} loading={posts.isFetching}>
        <HiChevronLeft />
      </Button>
      <p className="font-bold">
        {page} / {totalPage}
      </p>
      <Button
        variant="primary"
        className="px-3"
        onClick={handleNext}
        disabled={page === totalPage}
        loading={posts.isFetching}
      >
        <HiChevronRight />
      </Button>
    </div>
  )
}

export default Pagination
