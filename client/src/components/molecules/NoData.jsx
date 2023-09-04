const NoData = ({ Icon, title, text }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Icon className="text-7xl text-font/50 md:text-[86px]" />
      <div className="gap flex flex-col items-center gap-1 text-center font-semibold md:gap-2">
        <p className="text-[13px] text-font md:text-sm">{title}</p>
        <p className="text-xs text-font/75 md:text-[13px]">{text}</p>
      </div>
    </div>
  )
}

export default NoData
