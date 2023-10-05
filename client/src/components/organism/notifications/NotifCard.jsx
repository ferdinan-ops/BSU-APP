import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import * as formatDate from '../../../services/formatDate'
import { Avatar } from '../../atoms'
import { useMarkAsReadMutation } from '../../../store/api/notificationApi'

const NotifCard = ({ notif }) => {
  const navigate = useNavigate()
  const user = notif.userSender

  const [markAsRead] = useMarkAsReadMutation()

  const handleMarkAsRead = async (read) => {
    if (!read) await markAsRead(notif._id).unwrap()
    navigate(`/${notif.link}`)
  }

  return (
    <article
      className={clsx(
        'flex cursor-pointer items-start gap-3 rounded-lg p-4 md:items-center',
        notif.read ? 'bg-gray-100 hover:bg-gray-200' : 'bg-primary/10 hover:bg-primary/30'
      )}
      onClick={() => handleMarkAsRead(notif.read)}
    >
      <Avatar src={user.photo} alt={user.username} size="w-10 h-10 md:h-11 md:w-11 rounded-lg" />

      <div className="flex flex-1 flex-col text-sm md:text-base">
        <div>
          <span className="font-semibold">{user.username}</span>
          <span className="mx-1 text-font/60">&bull;</span>
          <span className="text-[15px] lowercase">{notif.message}</span>
        </div>
        <span className="ml-auto text-xs font-semibold text-font/50 md:ml-0 md:text-sm">
          {formatDate.fromNow(notif.createdAt)}
        </span>
      </div>
    </article>
  )
}

export default NotifCard
