const Checkbox = ({ label, ...rest }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-3">
        <input type="checkbox" className="checkbox-primary checkbox" {...rest} />
        <span className="label-text text-[13px] xl:text-sm">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
