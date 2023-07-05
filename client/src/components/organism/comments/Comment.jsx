import { Avatar } from '../../atoms'
import moment from 'moment'
import { More } from '../../molecules'
import { useSelector } from 'react-redux'

const Comment = ({ comment }) => {
  const userLogin = useSelector((state) => state.auth.userInfo)
  const user = comment.user
  return (
    <article className="flex items-start">
      <Avatar src={user.photo} alt={user.username} provider={user.provider} size="h-8 w-8 mr-3" />
      <div className="flex flex-1 flex-col gap-2 border-b-2 border-slate-200 pb-4">
        <div className="flex h-8 w-full items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[15px]">{user.username}</span>
            <span className="text-sm text-font/50">&bull;</span>
            <span className="text-sm text-font/50">{moment(comment.createdAt).fromNow()}</span>
          </div>
          {userLogin && <More comment={comment} />}
        </div>
        <p className="text-[15px]">{comment.comment}</p>
      </div>
    </article>
  )
}

export default Comment
