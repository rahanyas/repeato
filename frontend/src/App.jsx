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
import { GoogleOAuthProvider } from '@react-oauth/google';

function LandingRoute() {
  const navigate = useNavigate();
  return <Landing onGetStarted={() => navigate("/app")} />;
};

function DashboardRoute({onLogout}) {
  const navigate = useNavigate();

  const handleLogout = async ()=> {
    const success = await onLogout();
    if(success){
      navigate('/')
    }
  }
  return <Dashboard onExit={() => navigate("/")}  onLogout={handleLogout}/>;
};


function SiginInRoute({onAuthenticated}){
  const navigate = useNavigate();

 const handleAuthenticated = async () => {
  const success = onAuthenticated();

  if(success){
    navigate('/app')
  }
 }

  return (
    <SignUpPage 
    initialMode="signin"
    onBack={() => navigate('/')}
    onAuthenticated={handleAuthenticated}
    />
  )
};


// function GoogleAuth({onAuthenticated}){
//   const googleLogin = useGoogleLogin({
//     onSuccess : async (response) => {
//       try {
//         console.log('Google response', response);

//         const res = await axiosInstance.post('/api/auth/google',
//           {
//             credential : response.credential
//           },
//           {
//             withCredentials : true
//           }
//         );
//         console.log('google backend response : ', res);
//         if(res.status === 200 ||res.status === 201){
//           await onAuthenticated();
//         }
//       } catch (err) {
//         console.error('Google authentication error : ', err.response?.data || err);
//       }
//     },
//     onError : () => {
//       console.log('Google Login Failed');
//     }
//   });
//   return googleLogin;
// }

export default function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {showMessage, setLogedIn} = useMessage()

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/checkauth');
      setUser(res?.data?.user?.id);
      setLogedIn(true);
      console.log('res from checkauth : ', res);
      return true
    } catch (err) {
      console.log('err in checkAuth : ', err);
      setLogedIn(false)
      showMessage(err?.data?.msg ||'Please Login');
      setUser(null);
      return false
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAuth()
  },[]);

  const Logout = async () => {
    try {
      const res = await axiosInstance.post('/api/auth/logout');
      console.log('res from logout: ', res);
      if(res.status === 200){
        setUser(null);
        setLogedIn(false);
        showMessage(res?.data?.msg || "successfully Loged out");

        return true;
      };

      return false;
    } catch (err) {
      console.log('error in Logout func : ', err);
      showMessage(err?.data?.msg || 'Logout Failed');
      return false
    }
  }

  if(loading === true){
    return <RouteLoading/>
  }


  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

   
    <BrowserRouter>
    <Message />
      <Routes>

        <Route path="/" element={<LandingRoute />} />

        {/* public routes like sigin */}
        <Route element={<PublicRoutes user={user} loading={loading}/>}>
        <Route path='/sign-in' element={<SiginInRoute onAuthenticated={checkAuth}/> }/>
        </Route>

        {/* protected routes like dashboard  */}
        <Route element={<ProtectedRoutes user={user} loading={loading}/>}>

        <Route path="/app" element={<DashboardRoute  onLogout={Logout}/>} />
        </Route>

        <Route path="*" element={<RouteError/>}/>
        
      </Routes>
    </BrowserRouter>
     </GoogleOAuthProvider>
    </>
  );
}