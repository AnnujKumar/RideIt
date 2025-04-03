import React from 'react'
import{useEffect} from "react"
import CaptainLogin from "./pages/CaptainLogin";
import CaptainRegister from "./pages/CaptainRegister";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserProtectorWrapper from './UserProtectorWrapper';
import VehicleRegister from './pages/VehicleRegister';
import Home from "./pages/Home";
import "./App.css"
import UserLogout from "./pages/UserLogout"
import CaptainLogout from './pages/CaptainLogout';
import {Routes,Route} from "react-router-dom"
import UserHome from './pages/UserHome';
import Trial from "./pages/Trial"
import CaptainHome from './pages/CaptainHome';
import CaptainRideStart from './pages/CaptainRideStart';
import CaptainProtectorWrapper from './CaptainProtectorWrapper';
import UserRideStart from "./pages/UserRideStart"
const App = () => {
  useEffect(()=>{
       if(localStorage.getItem("token")){
        localStorage.removeItem("token")
       } 
  },[])
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Routes>
        <Route path="/user-ride-start" element={<UserRideStart />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-register" element={<CaptainRegister />}></Route>
        <Route path="/user-login" element={<UserLogin />}></Route>
        <Route path="/user-register" element={<UserRegister />}></Route>
        <Route path="/user-logout" element={<UserProtectorWrapper><UserLogout /></UserProtectorWrapper>}></Route>
        <Route path="/captain-vehicle-register" element={<VehicleRegister />}></Route>
        <Route path="/captain-logout" element={<CaptainProtectorWrapper><CaptainLogout /></CaptainProtectorWrapper>}></Route>
        <Route path="/user-home" element={<UserHome />}></Route>
        <Route path="/trial" element={<Trial />}></Route>
        <Route path="/ride-start" element={<UserRideStart />}></Route>
        <Route path="/captain-home" element={<CaptainProtectorWrapper><CaptainHome /></CaptainProtectorWrapper>}></Route>
        <Route path="/captain-ride-start" element={<CaptainRideStart />}></Route>
      </Routes>
    </div>
  )
}

export default App