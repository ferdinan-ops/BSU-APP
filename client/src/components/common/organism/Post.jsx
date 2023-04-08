import { HiHeart, HiBookmark } from 'react-icons/hi2'
import CONFIG from '../../../constants/environtment'
import { Link } from 'react-router-dom'
import { Avatar, Info } from '../atoms'
import { More } from '../molecules'
import moment from 'moment'

const Post = ({ post }) => {
  const ASSETS_URI = `${CONFIG.baseUrl}/assets`

  return (
    <article className="rounded-lg bg-white font-source">
      <div className="flex items-center justify-between p-5">
        <Link className="flex items-center gap-4" to={`/user/${post?.user?._id}`}>
          <Avatar src={post?.user?.photo} alt={post?.user?.username} size="h-9 w-9" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post?.user?.username}</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-[15px] text-slate-400">{moment(post.createdAt).fromNow()}</span>
          </div>
        </Link>
        <More postUserId={post?.user?._id} />
      </div>

      <div className="flex gap-7 p-5">
        <div className="h-[216px] flex-[1.5] overflow-hidden rounded-lg">
          <img src={`${ASSETS_URI}/${post.image}`} alt={post.mataKuliah} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-[4] flex-col gap-4">
          <Link
            to={`/question/${post._id}`}
            className="w-fit text-xl font-semibold capitalize hover:text-primary md:text-2xl"
          >
            {post.mataKuliah}
          </Link>

          <table className="w-fit text-sm md:text-base">
            <tbody>
              <Info title="Fakultas" content={post.fakultas} />
              <Info title="Program Studi" content={post.programStudi} />
              <Info title="Semester" content={post.semester} />
              <Info title="Kategori" content={post.kategori} />
            </tbody>
          </table>

          <div className="mt-[30px] flex items-center gap-7 text-sm md:mt-auto md:text-base">
            <div className="flex items-center gap-4 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-200">
                <HiHeart className="text-[17px] text-red-500" />
              </div>
              <p className="font-poppins">{post.likeCount}</p>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-200">
                <HiBookmark className="text-[17px] text-indigo-500" />
              </div>
              <p className="font-poppins">{post.saveCount}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post
