const Info = ({ title, content }) => {
  return (
    <tr>
      <td className="font-semibold">{title}</td>
      <td className="px-4">:</td>
      <td>{content}</td>
    </tr>
  )
}

export default Info
