import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

const CommentNull = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <HiOutlineChatBubbleLeftRight className="text-7xl text-font/50 md:text-[86px]" />
      <div className="gap flex flex-col items-center gap-1 text-center font-semibold md:gap-2">
        <p className="text-[13px] text-font md:text-sm">Pujian dan umpan balik Anda sangat kami harapkan!</p>
        <p className="text-xs text-font/75 md:text-[13px]">
          Bagikan pendapat Anda dengan menggunakan kotak komentar di bawah.
        </p>
      </div>
    </div>
  )
}

export default CommentNull
