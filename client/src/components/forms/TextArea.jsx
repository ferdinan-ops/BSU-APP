import { useFormContext } from 'react-hook-form'

const TextArea = ({ id, placeholder, ...rest }) => {
  const { register } = useFormContext()

  const handleInput = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <textarea
      {...register(id, { required: true })}
      {...rest}
      name={id}
      id={id}
      placeholder={placeholder}
      rows={1}
      spellCheck="false"
      className="flex-1 resize-none self-start overflow-y-hidden border-none pt-[7px] text-sm outline-none md:pt-[9px] md:text-base"
      onInput={handleInput}
    />
  )
}

export default TextArea
