import { Outlet } from 'react-router-dom'
import { Header } from '../organism'

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="z-0 flex min-h-[calc(100vh-100px)] flex-col font-source">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
