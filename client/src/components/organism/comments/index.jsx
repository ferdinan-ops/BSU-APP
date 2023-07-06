import { useSelector } from 'react-redux'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

import { useGetCommentsQuery } from '../../../store/api/commentApi'
import NoData from '../../molecules/NoData'
import CommentSkeleton from './CommentSkeleton'
import CommentForm from './CommentForm'
import Comment from './Comment'

const Comments = ({ question }) => {
  const user = useSelector((state) => state.auth.userInfo)
  const { data: comments, isSuccess, isLoading } = useGetCommentsQuery(question._id)

  let content
  if (isLoading) {
    content = <CommentSkeleton />
  } else if (isSuccess && comments.data.length > 0) {
    content = comments.data.map((comment) => <Comment comment={comment} key={comment._id} />)
  } else if (isSuccess && comments.data.length === 0) {
    content = (
      <NoData
        Icon={HiOutlineChatBubbleLeftRight}
        title="Pujian dan umpan balik Anda sangat kami harapkan!"
        text="Bagikan pendapat Anda dengan menggunakan kotak komentar di bawah."
      />
    )
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-[21px] md:w-8/12">
      {user && <CommentForm question={question} />}
      <h3 className="px-4 text-sm font-semibold">{comments?.data?.length} komentar</h3>
      <div className="flex flex-col gap-4 px-4">{content}</div>
    </div>
  )
}

export default Comments
