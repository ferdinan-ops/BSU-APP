import { Skeleton } from '../../atoms'

const CommentSkeleton = () => {
  return (
    <article className="flex items-start">
      <Skeleton className="mr-3 h-8 w-8 rounded-full" />
      <div className="flex flex-1 flex-col gap-2 border-b-2 border-slate-200 pb-4">
        <div className="flex h-8 w-full items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Skeleton className="h-4 w-14 rounded-lg" />
            <Skeleton className="h-4 w-10 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-10/12 rounded-lg" />
          <Skeleton className="h-3 w-6/12 rounded-lg" />
          <Skeleton className="h-3 w-8/12 rounded-lg" />
        </div>
      </div>
    </article>
  )
}

export default CommentSkeleton
