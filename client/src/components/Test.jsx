import { useParams } from 'react-router-dom'
import { useGetQuestionQuery } from '../store/api/questionApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Test = () => {
  const [liked, setLiked] = useState(false)

  const { postId } = useParams()
  const { data, isLoading, isError, isSuccess } = useGetQuestionQuery(postId)
  const { _id } = useSelector((state) => state.auth.userInfo)

  useEffect(() => {
    if (isSuccess) {
      setLiked(data.data?.likes?.includes(_id))
    }
  }, [isSuccess, _id])
  console.log({ liked })
  return <div>Test</div>
}

export default Test
