import { HiHeart, HiBookmark } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

import * as formatDate from '../../../services/formatDate'
import { Button, Icon, Info } from '../../atoms'

const Post = ({ post, className }) => {
  const navigate = useNavigate()

  return (
    <article className={'rounded-lg bg-white p-6 shadow-card ' + className}>
      <h1 className="text-xl font-bold">{post.mataKuliah}</h1>
      <table className="mt-5 w-fit text-sm">
        <tbody>
          <Info title="Fakultas" content={post.fakultas} />
          <Info title="Program Studi" content={post.programStudi} />
          <Info title="Semester" content={post.semester} />
          <Info title="Kategori" content={post.kategori} />
          <Info title="Tanggal Upload" content={formatDate.base(post.createdAt)} />
        </tbody>
      </table>
      <div className="mt-8 flex items-center justify-between text-font">
        <div className="flex items-center gap-5 text-sm md:text-base">
          <div className="flex items-center gap-3 font-semibold">
            <Icon className="pointer-events-none h-6 w-6 bg-red-200 hover:bg-red-200">
              <HiHeart className="text-red-500" />
            </Icon>
            <p className="font-poppins text-sm">{post.likeCount}</p>
          </div>
          <div className="flex items-center gap-3 font-semibold">
            <Icon className="pointer-events-none h-6 w-6 bg-yellow-200 hover:bg-yellow-200">
              <HiBookmark className="text-yellow-500" />
            </Icon>
            <p className="font-poppins text-sm">{post.saveCount}</p>
          </div>
        </div>
        <Button variant="primary" className="px-4 xl:text-xs" onClick={() => navigate(`/${post._id}`)}>
          Lihat Detail
        </Button>
      </div>
    </article>
  )
}

export default Post
