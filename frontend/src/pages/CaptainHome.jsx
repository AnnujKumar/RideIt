import React, { useContext, useRef,useState,useEffect } from 'react'
import RideAvailablePopup from '../Components/RidePopup'
import CaptainInformation  from '../Components/CaptainInformation'
import CaptainRidePopup from '../Components/CaptainRidePopup'
import {Link} from "react-router-dom"
import {useGSAP} from "@gsap/react"
import { CaptainDataContext } from '../contexts/CaptainContext'
import { RideDataContext } from '../contexts/RideContext'
import {SocketDataContext} from "../contexts/SocketContext"

import axios from "axios"
import gsap from "gsap"
const CaptainHome = () => {
  const [RidePopup, setRidePopup] = useState(false);
  const [confirmRidePopup, setconfirmRidePopup] = useState(false)
  const confirmRidePopupRef = useRef(null);
  const [otp, setOtp] = useState("")
   const RidePopupRef = useRef(null);
   const {captain,setCaptain} = useContext(CaptainDataContext)
   const {ride,setRide} = useContext(RideDataContext)
   const {socket} = useContext(SocketDataContext)
   const [rideAvailable, setrideAvailable] = useState(false)

   const confirmRide =async ()=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`,{
        
            captainData:captain,
            rideData:ride
          
      },
    {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    if(response.status===201){
      console.log(response.data.ride.user.socketId)
      setRide(response.data.ride)
      setRidePopup(false);
      setconfirmRidePopup(true);
    }
    else{
          console.log("error occurred");
    }
  }
  catch(err){
    console.log(err)
  }
   }
   useEffect(()=>{
    console.log("Setting captain socket id");
    socket.emit("join",{userId:captain._id,userType:"captain"})
    const sendCoordinates = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
          socket.emit("update-captain-location",{userId:captain._id,location:{
            ltd:position.coords.latitude,
            lng:position.coords.longitude
          }})
        })
      }
     
    }
    setInterval(sendCoordinates,5000)
   },[])
   socket.on("ride-available",message=>{
    console.log(message)
      setRide(message);
      setRidePopup(true);
  })

  useGSAP(function(){
    if(RidePopup){ 
    gsap.to(RidePopupRef.current,{
      transform:"translateY(0)"
    })
  }
  else{
    gsap.to(RidePopupRef.current,{
      transform:"translateY(100%)"
    })
  }
  },[RidePopup])

  useGSAP(function(){
    if(confirmRidePopup){
    gsap.to(confirmRidePopupRef.current,{
      transform:"translateY(0)"
    })
  }
  else{
    gsap.to(confirmRidePopupRef.current,{
      transform:"translateY(100%)"
    })
  }
  },[confirmRidePopup])



  return (
    <div className="h-screen w-screen overflow-hidden relative">
    <div className="h-3/5">
    <img className="w-25 absolute top-0 py-5 ml-5" 
   src="/ride-it-logo-black.png" 
   alt="Uber Logo" />
   <Link to="/captain-logout">
          <h4 className="absolute top-0 right-8 mt-4 bg-white p-2 rounded-full text-xl">
          <i className="ri-logout-box-r-line"></i>
          </h4>
          </Link>

    <div className="h-full w-full">
      <img className="h-full w-full object-cover" src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="Background" />
    </div>
    </div>
    <div className="h-2/5 bg-white rounded-t-2xl">
      <CaptainInformation />
    </div>
    <div ref={RidePopupRef} className="fixed z-10 bottom-0 bg-white w-full translate-y-100">
      <RideAvailablePopup confirmRide={confirmRide} RidePopup={RidePopup} setRidePopup={setRidePopup} setconfirmRidePopup={setconfirmRidePopup}/>
    </div>
    <div ref={confirmRidePopupRef} className="absolute bottom-0 h-screen bg-white w-full translate-y-100">
      <CaptainRidePopup setconfirmRidePopup={setconfirmRidePopup} setOtp={setOtp} otp={otp}/>
    </div>
    </div>
  )
}

export default CaptainHome