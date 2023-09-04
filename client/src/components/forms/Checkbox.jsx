import Label from './Label'
const Checkbox = ({ label, ...rest }) => {
  return (
    <div className="flex items-center gap-3">
      <input type="checkbox" id={label} className="h-[17px] w-[17px] cursor-pointer accent-primary" />
      <Label htmlFor={label}>{label}</Label>
    </div>
  )
}

export default Checkbox
