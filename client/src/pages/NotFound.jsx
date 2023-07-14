import { useNavigate } from 'react-router-dom'
import { Button, Section } from '../components'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Section className="z-0 min-h-[calc(100vh-100px)] py-[40px] xl:py-[60px]" title="404 Not Found">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h3 className="font-semibold text-font/50">Halaman tidak dapat ditemukan</h3>
        <Button className="mt-8 px-4 shadow-button" variant="primary" onClick={() => navigate('/')}>
          Kembali ke Beranda
        </Button>
      </div>
    </Section>
  )
}

export default NotFound
