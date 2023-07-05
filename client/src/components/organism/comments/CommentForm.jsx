import { FormProvider, useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useAddCommentMutation, useUpdateCommentMutation } from '../../../store/api/commentApi'
import { Avatar, Button } from '../../atoms'
import { TextArea } from '../../forms'

const CommentForm = ({ question }) => {
  const methods = useForm()
  const { handleSubmit, formState, reset, setValue } = methods

  const user = useSelector((state) => state.auth.userInfo)
  const comment = useSelector((state) => state.comment.comment)

  const [addComment, { isSuccess, isLoading }] = useAddCommentMutation()
  const [updateComment, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] = useUpdateCommentMutation()

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) reset()
  }, [isSuccess, isSuccessUpdate])

  useEffect(() => {
    if (comment) setValue('comment', comment.comment)
  }, [comment])

  const onSubmit = (values) => {
    if (comment) return updateComment({ commentId: comment._id, comment: values.comment })
    addComment({ questionId: question._id, userQuestionId: question.user._id, ...values })
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex justify-between gap-5 rounded-lg border-2 border-slate-200 p-2 focus-within:border-primary md:p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Avatar src={user.photo} alt={user.username} provider={user.provider} size="h-8 w-8 md:h-10 md:w-10 border-2" />
        <TextArea id="comment" placeholder="Tulis komentar" />
        <Button
          className="self-end px-3 shadow-button md:px-4 md:text-xs"
          variant="primary"
          disabled={!formState.isValid}
          loading={isLoading || isLoadingUpdate}
        >
          <span className="hidden md:flex">Upload komentar</span>
          <HiPaperAirplane className="md:hidden" />
        </Button>
      </form>
    </FormProvider>
  )
}

export default CommentForm
