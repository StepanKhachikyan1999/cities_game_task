import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='bg-white rounded-2xl flex items-center justify-center h-max m-4 w-128'>
      <Outlet />
    </div>
  )
}

export default RootLayout