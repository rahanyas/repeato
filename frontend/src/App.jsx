import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUpPage from "./pages/SignIn";
import Message from "./components/shared/Message";
import {  useEffect, useState } from "react";
import { useMessage } from "./context/Message.context";
import axiosInstance from "./utils/axiosWrapper";
import { ProtectedRoutes, PublicRoutes } from "./routes/Public&Protected.routes";
import  RouteError  from "./pages/RouteStatus";
import RouteLoading from "./pages/RouteLoading";


function LandingRoute() {
  const navigate = useNavigate();
  return <Landing onGetStarted={() => navigate("/app")} />;
};

function DashboardRoute() {
  const navigate = useNavigate();
  return <Dashboard onExit={() => navigate("/")} />;
};


function SiginInRoute(){
  const navigate = useNavigate();

  return (
    <SignUpPage 
    initialMode="signin"
    onBack={() => navigate('/')}
    onAuthenticated={() => navigate('/app')}
    onGoogleAuth={() => {/* trigger real Google OAuth */}}
    />
  )
}

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {showMessage} = useMessage()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/checkauth');
        setUser(res?.data?.user?.id);
        console.log('res from checkauth : ', res)
      } catch (err) {
        console.log('err in checkAuth : ', err);
        showMessage(err?.data?.msg ||'Please Login');
        setUser(null)
      }finally{
        setLoading(false)
      }
    };

    checkAuth()
  },[]);

  if(loading === true){
    return <RouteLoading/>
  }


  return (
    <>
    <BrowserRouter>
    <Message />
      <Routes>

        <Route path="/" element={<LandingRoute />} />

        {/* public routes like sigin */}
        <Route element={<PublicRoutes user={user} loading={loading}/>}>
        <Route path='/sign-in' element={<SiginInRoute/> }/>
        </Route>

        {/* protected routes like dashboard  */}
        <Route element={<ProtectedRoutes user={user} loading={loading}/>}>

        <Route path="/app" element={<DashboardRoute />} />
        </Route>

        <Route path="*" element={<RouteError/>}/>
        
      </Routes>
    </BrowserRouter>
    </>
  );
}