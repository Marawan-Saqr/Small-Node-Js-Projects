import Topbar from './Topbar/Topbar';
import { Outlet } from 'react-router-dom';


const System = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  )
}




export default System;