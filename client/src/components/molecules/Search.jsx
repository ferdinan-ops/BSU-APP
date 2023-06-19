import { FormProvider, useForm } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Input } from '../forms'

const Search = ({ className, children }) => {
  const methods = useForm()
  const { handleSubmit } = methods

  const onSubmit = (data) => {
    console.log(data)
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
