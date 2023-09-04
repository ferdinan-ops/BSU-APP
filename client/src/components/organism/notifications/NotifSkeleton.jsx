import { Skeleton } from '../../atoms'

const NotifSkeleton = () => {
  return (
    <article className="flex cursor-pointer items-start gap-3 rounded-lg bg-gray-100 p-4 md:items-center">
      <Skeleton className="h-10 w-10 rounded-lg md:h-11 md:w-11" />
      <div className="mt-1 flex flex-1 flex-col gap-2 text-sm md:mt-0 md:text-base">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-[30%] rounded-full font-semibold" />
          <Skeleton className="h-3 w-[50%] rounded-full lowercase" />
        </div>
        <Skeleton className="h-2 w-[20%] rounded-full text-xs font-semibold text-font/60 md:ml-0 md:text-sm" />
      </div>
    </article>
  )
}

export default NotifSkeleton
