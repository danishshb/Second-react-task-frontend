import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./components/pages/SignupForm";
import LoginForm from "./components/pages/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layouts from './components/layout/Layouts';
import Dashboard from "./components/pages/Dashboard";
import MyDrive from "./components/pages/MyDrive";
import Profile from "./components/pages/Profile";
import FolderInner from "./components/pages/FolderInner";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import { AuthContext } from "./components/context/Auth";
import setAuthToken from "./components/utils/setAuthToken";
import ForgotPassword from "./components/pages/forgotPassword";

function App() {
  
  const token = localStorage.getItem("token");
  const { fetchUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route element={<ProtectedRoutes/>}>
      <Route path='/dashboard' element={<Layouts><Dashboard /></Layouts>} />
      <Route path='/mydrive' element={<Layouts><MyDrive /></Layouts>} />
      <Route path="/profile" element={<Layouts><Profile /></Layouts>} />
      <Route path="/folderinner" element={<Layouts><FolderInner /></Layouts>}/>
      </Route>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
