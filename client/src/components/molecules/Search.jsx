import { createSearchParams, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { Input } from '../forms'
import { useDispatch } from 'react-redux'
import { setSearchPage } from '../../store/features/searchSlice'

const Search = ({ className, children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const methods = useForm()
  const { handleSubmit } = methods

  const onSubmit = (data) => {
    dispatch(setSearchPage(1))
    const search = `?${createSearchParams({ search: data.search })}`
    navigate({ pathname: '/', search })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        <Input id="search" LeftIcon={HiMagnifyingGlass} placeholder="Cari Soal..." />
        {children}
      </form>
    </FormProvider>
  )
}

export default Search
