import { defaultProfile } from '../../assets'
import CONFIG from '../../constants/environtment'
import clsx from 'clsx'

const Avatar = ({ size, src, alt, update }) => {
  return (
    <div className={clsx('flex overflow-hidden rounded-full border-2', size)}>
      <img
        src={src ? (src.startsWith('http') || update ? src : CONFIG.imageUrl + src) : defaultProfile}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export default Avatar
