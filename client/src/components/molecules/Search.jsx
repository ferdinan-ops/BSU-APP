import { createSearchParams, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { Input } from '../forms'

const Search = ({ className, children }) => {
  const navigate = useNavigate()
  const methods = useForm()
  const { handleSubmit } = methods

  const onSubmit = (data) => {
    navigate({
      pathname: '/',
      search: `?${createSearchParams({ search: data.search })}`
    })
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
