import { Controller, useFormContext } from 'react-hook-form'
import Select, { components } from 'react-select'
import { FiChevronDown } from 'react-icons/fi'

import Label from './Label'

const Dropdown = ({ label, id, disabled = false, options, defaultValue, placeholder, ...rest }) => {
  const { control, formState } = useFormContext()
  const { errors } = formState

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      border: `2px solid ${errors[id] ? '#EF4444' : state.isFocused ? '#2563eb' : '#e2e8f0'}`,
      boxShadow: 'none',
      '&:hover': {
        border: `2px solid ${errors[id] ? '#EF4444' : '#e2e8f0'}`
      },
      '*': {
        boxShadow: 'none'
      },
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: disabled ? '#F3F4F6' : undefined,
      cursor: 'pointer',
      '@media (max-width: 640px)': {
        padding: '0.5rem 1rem'
      },
      transition: 'none'
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      gap: '0.5rem'
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: '0'
      }
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#878787',
      '&:hover': {
        color: '#878787'
      }
    }),
    options: (styles, state) => ({
      ...styles,
      color: '#344054',
      background: state.isSelected ? '#2563eb' : '#fff',
      '&:hover': {
        background: '#2563eb'
      },
      cursor: 'pointer'
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '0.5rem',
      overvlow: 'hidden'
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#9ca3af'
    })
  }

  const optionsObject = options.map((option) => {
    return {
      value: option,
      label: option
    }
  })

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative text-sm md:text-[15px]">
        <Controller
          name={id}
          control={control}
          defaultValue={defaultValue ? { value: defaultValue, label: defaultValue } : ''}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={disabled}
              placeholder={placeholder}
              options={optionsObject}
              styles={customStyles}
              className={{ control: () => '!min-h-[2.25rem] md:!min-h-[2.5rem]' }}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: (props) => (
                  <components.DropdownIndicator {...props}>
                    <FiChevronDown className="text-sm text-slate-400 sm:text-xl" />
                  </components.DropdownIndicator>
                )
              }}
            />
          )}
          {...rest}
        />
      </div>
      {errors[id] && <span className="-mt-1 text-xs text-red-400 xl:text-sm ">{errors[id].message.toString()}</span>}
    </div>
  )
}
export default Dropdown
