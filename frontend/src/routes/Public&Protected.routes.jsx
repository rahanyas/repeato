import {Navigate, Outlet} from "react-router-dom";
export const PublicRoutes = ({user}) => {

  if(user){
    return <Navigate to="/app" replace/>
  };

  return <Outlet />
};

export const ProtectedRoutes = ({user}) => {

  if(!user){
    return <Navigate to='/sign-in' replace/>
  };

  return <Outlet />;
}