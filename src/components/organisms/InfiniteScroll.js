import { Ring } from '@uiball/loaders'
import React from 'react'
import { Button } from '../atoms'

export default function InfiniteScroll({ counts, dataLength, isLoading, loadMoreHandler }) {
  return (
    <>
      {counts === dataLength ? (
        <p className="mx-auto text-font font-medium border-2 border-primary border-dashed px-4 py-2 rounded w-fit">
          Anda telah melihat semuanya 🙂
        </p>
      ) : (
        isLoading ? (
          <div className="flex items-center justify-center">
            <Ring size={40} lineWeight={8} speed={2} color="#FCB900" />
          </div>
        ) : (
          <div className="shadow-button mx-auto bg-primary w-[120px] h-[40px] rounded-lg text-font font-semibold text-[15px] transition-all">
            <Button onClick={loadMoreHandler}>Load More</Button>
          </div>
        )
      )}
    </>
  )
}
