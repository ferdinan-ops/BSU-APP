const Brand = ({ src, title, className }) => {
  return (
    <>
      <div className={`${className}`}>
        <img src={src} alt="brand" className="w-full h-full" />
      </div>
      <span>{title}</span>
    </>
  )
}

export default Brand
