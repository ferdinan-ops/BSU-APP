import { Outlet } from 'react-router-dom'
import { Header } from '../organism'

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
