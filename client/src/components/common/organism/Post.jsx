import CONFIG from '../../../constants/environtment'

const Post = ({ post }) => {
  const ASSETS_URI = `${CONFIG.baseUrl}/assets`
  return (
    <article className="rounded-lg bg-white p-5">
      <div className="flex items-center gap-4">
        <img
          src={post?.user?.photo ? `${ASSETS_URI}/${post?.user?.photo}` : 'https://source.unsplash.com/random/?profile'}
          alt={post?.user?.username}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{post?.user?.username}</span>
          <span className="text-sm text-slate-400">{post.createdAt}</span>
        </div>
      </div>
    </article>
  )
}

export default Post
