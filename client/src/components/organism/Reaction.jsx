import { HiBookmark, HiHeart, HiOutlineBookmark, HiOutlineHeart } from 'react-icons/hi2'
import { Button } from '../atoms'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLikeQuestionMutation, useSaveQuestionMutation } from '../../store/api/questionApi'
import { toast } from 'react-hot-toast'

const Reaction = ({ question }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(question.likes?.length)
  const [saveCount, setSaveCount] = useState(question.saves?.length)

  const user = useSelector((state) => state.auth.userInfo)
  const [like] = useLikeQuestionMutation()
  const [save] = useSaveQuestionMutation()

  useEffect(() => {
    if (user) {
      setIsLiked(question.likes?.includes(user._id))
      setIsSaved(question.saves?.includes(user._id))
    }
  }, [question, user])

  const likeHandler = () => {
    if (user) {
      like(question._id)
      setIsLiked(!isLiked)
      if (isLiked) return setLikeCount(likeCount - 1)
      return setLikeCount(likeCount + 1)
    }
    toast.error('Anda harus login terlebih dahulu')
  }

  const saveHandler = () => {
    if (user) {
      save(question._id)
      setIsSaved(!isSaved)
      if (isSaved) return setSaveCount(saveCount - 1)
      return setSaveCount(saveCount + 1)
    }
    toast.error('Anda harus login terlebih dahulu')
  }

  return (
    <div className="flex gap-4 md:gap-5">
      <Button className="gap-2 px-3 text-sm md:gap-3 md:px-4 md:text-base" variant="outline" onClick={likeHandler}>
        {isLiked ? <HiHeart className="text-red-500" /> : <HiOutlineHeart />}
        <span className="text-xs md:text-sm">{likeCount}</span>
      </Button>
      <Button className="gap-2 px-3 text-sm md:gap-3 md:px-4 md:text-base" variant="outline" onClick={saveHandler}>
        {isSaved ? <HiBookmark className="text-yellow-500" /> : <HiOutlineBookmark />}
        <span className="text-xs md:text-sm">{saveCount}</span>
      </Button>
    </div>
  )
}

export default Reaction
