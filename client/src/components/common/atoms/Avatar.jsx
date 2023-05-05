import CONFIG from '../../../constants/environtment'

const Avatar = ({ size, src, alt, provider }) => {
  const ASSETS_URI = `${CONFIG.baseUrl}/assets`
  const defaultImage = 'https://source.unsplash.com/random/?profile'
  return (
    <div className={`flex overflow-hidden rounded-full ${size}`}>
      <img
        src={src ? (provider === 'local' ? `${ASSETS_URI}/${src}` : src) : defaultImage}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default Avatar
