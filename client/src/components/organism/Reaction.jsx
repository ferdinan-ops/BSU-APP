import { HiBookmark, HiHeart, HiOutlineBookmark, HiOutlineHeart } from 'react-icons/hi2'
import { Button } from '../atoms'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLikeQuestionMutation, useSaveQuestionMutation } from '../../store/api/questionApi'
import { toast } from 'react-hot-toast'

const Reaction = ({ question }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [saveCount, setSaveCount] = useState(0)

  const { _id } = useSelector((state) => state.auth.userInfo)
  const [like] = useLikeQuestionMutation()
  const [save] = useSaveQuestionMutation()

  useEffect(() => {
    if (question) {
      setLikeCount(question.likes?.length)
      setSaveCount(question.saves?.length)
      if (_id) {
        setIsLiked(question.likes?.includes(_id))
        setIsSaved(question.saves?.includes(_id))
      }
    }
  }, [question, _id])

  const likeHandler = () => {
    if (_id) {
      like(question._id)
      setIsLiked(!isLiked)
      if (isLiked) return setLikeCount(likeCount - 1)
      return setLikeCount(likeCount + 1)
    }
    toast.error('Anda harus login terlebih dahulu')
  }

  const saveHandler = () => {
    if (_id) {
      save(question._id)
      setIsSaved(!isSaved)
      if (isSaved) return setSaveCount(saveCount - 1)
      return setSaveCount(saveCount + 1)
    }
    toast.error('Anda harus login terlebih dahulu')
  }

  return (
    <div className="flex gap-4 md:gap-5">
      <Button className="gap-2 px-3 text-xs md:gap-3 md:px-4 md:text-sm" variant="outline" onClick={likeHandler}>
        {isLiked ? (
          <HiHeart className="text-sm text-red-500 md:text-base" />
        ) : (
          <HiOutlineHeart className="text-sm md:text-base" />
        )}
        <span>{likeCount}</span>
      </Button>
      <Button className="gap-2 px-3 text-xs md:gap-3 md:px-4 md:text-sm" variant="outline" onClick={saveHandler}>
        {isSaved ? (
          <HiBookmark className="text-sm text-yellow-500 md:text-base" />
        ) : (
          <HiOutlineBookmark className="text-sm md:text-base" />
        )}
        <span>{saveCount}</span>
      </Button>
    </div>
  )
}

export default Reaction
