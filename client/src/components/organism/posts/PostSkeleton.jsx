import { Container, Skeleton } from '../../atoms'

const PostSkeleton = ({ count }) => {
  return (
    <Container className="my-5 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <article className="rounded-lg bg-white p-6 shadow-card" key={i}>
          <Skeleton className="rounded-lg text-xl font-bold" />
          <div className="mt-5 flex flex-col gap-3 text-sm">
            {[...Array(4)].map((_, i) => (
              <div className="flex items-center gap-4" key={i}>
                <Skeleton className="w-full rounded-lg" />
                <Skeleton className="w-full rounded-lg" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between text-font">
            <div className="flex items-center gap-5 text-sm md:text-base">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-10 w-20 rounded-lg" />
          </div>
        </article>
      ))}
    </Container>
  )
}

export default PostSkeleton
