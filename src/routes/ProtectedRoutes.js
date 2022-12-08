import { Outlet, Navigate } from "react-router-dom";

import { getToken } from '../authenticate.js'


const  ProtectedRoutes=() =>{

    const token = getToken();
  
    return token ?<Outlet/>: <Navigate to="/login"/>
  }
  
  export default ProtectedRoutes;