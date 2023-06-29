import { HiOutlineChatBubbleLeftRight, HiPaperAirplane } from 'react-icons/hi2'
import { FormProvider, useForm } from 'react-hook-form'

import { Avatar, Button } from '../atoms'
import { TextArea } from '../forms'

const Comments = ({ user }) => {
  const methods = useForm()
  const { handleSubmit, formState } = methods
  const { isValid } = formState

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className="flex flex-col gap-5">
      <FormProvider {...methods}>
        <form
          className="flex justify-between gap-5 rounded-lg border-2 border-slate-200 p-2 focus-within:border-primary md:p-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Avatar src={user.photo} alt={user.username} provider={user.provider} size="h-8 w-8 md:h-10 md:w-10" />
          <TextArea id="comment" placeholder="Tulis komentar" />
          <Button className="self-end px-3 shadow-button md:px-4 md:text-xs" variant="primary" disabled={!isValid}>
            <span className="hidden md:flex">Upload komentar</span>
            <HiPaperAirplane className="md:hidden" />
          </Button>
        </form>
      </FormProvider>
      <h3 className="mt-5 text-sm font-semibold">0 komentar</h3>
      <div className="my-8 flex flex-col items-center gap-8 md:my-10 md:gap-8">
        <HiOutlineChatBubbleLeftRight className="text-7xl text-font/50 md:text-[86px]" />
        <div className="gap flex flex-col items-center gap-1 text-center font-semibold md:gap-2">
          <p className="text-[13px] text-font md:text-sm">Pujian dan umpan balik Anda sangat kami harapkan!</p>
          <p className="text-xs text-font/75 md:text-[13px]">
            Bagikan pendapat Anda dengan menggunakan kotak komentar di bawah.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comments
