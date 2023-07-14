import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { openDialog, setIsLoading } from '../store/features/dialogSlice'

const useSuccessProsess = ({ isLoading, isSuccess, title, text }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) dispatch(setIsLoading(true))
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoading(false))
      const timer = setTimeout(() => {
        dispatch(
          openDialog({
            isOpen: true,
            title,
            content: text,
            buttonText: 'Tutup',
            variant: 'success',
            handler: () => {}
          })
        )
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])
}

export default useSuccessProsess
