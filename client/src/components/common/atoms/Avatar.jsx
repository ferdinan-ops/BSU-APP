import CONFIG from '../../../constants/environtment'

const Avatar = ({ size, src, alt }) => {
  const ASSETS_URI = CONFIG.baseUrl + '/assets'
  return (
    <div className={`flex overflow-hidden rounded-full ${size}`}>
      <img
        src={src ? `${ASSETS_URI}/${src}` : 'https://source.unsplash.com/random/?profile'}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default Avatar
