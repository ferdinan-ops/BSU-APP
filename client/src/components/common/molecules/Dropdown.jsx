import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'
import { Label } from '../atoms'

const Dropdown = ({ title, options, name, value, onChange }) => {
  const [query, setQuery] = useState('')

  const searchData = options.filter((data) =>
    data.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
  )
  const filteredData = query === '' ? options : searchData

  return (
    <div className="flex flex-col">
      <Label htmlFor={title}>{title}</Label>
      <Combobox value={value} onChange={onChange} name={name}>
        <div className="relative mt-3">
          <div className="relative flex h-[50px] w-full cursor-default items-center justify-center overflow-hidden rounded-lg border-2 border-slate-200 text-base focus-within:border-primary">
            <Combobox.Input
              className="w-full px-4 py-2 text-sm text-font outline-none md:text-base xl:px-6 xl:py-3"
              displayValue={(data) => data}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown className="h-5 w-5 text-font" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
              {filteredData.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Tidak dapat menemukan apapun 😢.
                </div>
              ) : (
                filteredData.map((data, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{data}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-primary'
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
export default Dropdown
