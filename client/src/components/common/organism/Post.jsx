import { HiEllipsisHorizontal, HiHeart, HiBookmark } from 'react-icons/hi2'
import CONFIG from '../../../constants/environtment'
import moment from 'moment'

const Post = ({ post }) => {
  const ASSETS_URI = `${CONFIG.baseUrl}/assets`

  return (
    <article className="rounded-lg bg-white font-source">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div className="flex items-center gap-4">
          <img
            src={
              post?.user?.photo ? `${ASSETS_URI}/${post?.user?.photo}` : 'https://source.unsplash.com/random/?profile'
            }
            alt={post?.user?.username}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post?.user?.username}</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-[15px] text-slate-400">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-slate-200">
          <HiEllipsisHorizontal className="text-2xl text-font" />
        </div>
      </div>
      <div className="flex gap-7 p-5">
        <div className="h-[216px] flex-[1.5] overflow-hidden rounded-lg">
          <img src={`${ASSETS_URI}/${post.image}`} alt={post.mataKuliah} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-[4] flex-col gap-4">
          <h1 className="text-xl font-semibold capitalize md:text-2xl">{post.mataKuliah}</h1>
          <table className="w-fit text-sm md:text-base">
            <tbody>
              <tr>
                <td className="font-semibold">Fakultas</td>
                <td className="px-4">:</td>
                <td className="text-[#5C5C5C]">{post.fakultas}</td>
              </tr>
              <tr>
                <td className="font-semibold">Program Studi</td>
                <td className="px-4">:</td>
                <td className="text-[#5C5C5C]">{post.programStudi}</td>
              </tr>
              <tr>
                <td className="font-semibold">Semester</td>
                <td className="px-4">:</td>
                <td className="text-[#5C5C5C]">{post.semester}</td>
              </tr>
              <tr>
                <td className="font-semibold">Kategori</td>
                <td className="px-4">:</td>
                <td className="text-[#5C5C5C]">{post.kategori}</td>
              </tr>
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
