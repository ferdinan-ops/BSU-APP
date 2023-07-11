import { useSelector } from 'react-redux'

import * as formatDate from '../../../services/formatDate'
import { More } from '../../molecules'
import { Avatar } from '../../atoms'
import { Link } from 'react-router-dom'

const Comment = ({ comment, questionId }) => {
  const userLogin = useSelector((state) => state.auth.userInfo)
  const user = comment.user

  return (
    <article className="flex items-start">
      <Avatar src={user.photo} alt={user.username} size="w-7 h-7 mr-2 md:h-8 md:w-8 md:mr-3" />
      <div className="flex flex-1 flex-col gap-2 border-b-2 border-slate-200 pb-3 md:pb-4">
        <div className="flex h-7 w-full items-center justify-between md:h-8">
          <div className="flex items-center gap-1 truncate md:gap-2">
            <Link to={`/user/${user._id}`} className="text-sm font-semibold hover:text-primary md:text-[15px]">
              {user.username}
            </Link>
            <span className="text-xs text-font/60 md:text-sm">&bull;</span>
            <span className="text-xs text-font/60 md:text-sm">{formatDate.fromNow(comment.createdAt)}</span>
          </div>
          {userLogin && <More comment={comment} questionId={questionId} />}
        </div>
        <p className="text-sm md:text-[15px]">{comment.comment}</p>
      </div>
    </article>
  )
}

export default Comment
