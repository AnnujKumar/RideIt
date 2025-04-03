import React,{useRef,useState,useEffect,useContext} from 'react'
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import CompleteRides from '../Components/CompleteRides'
import { SocketDataContext } from '../contexts/SocketContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { RideDataContext } from '../contexts/RideContext'
const CaptainRideStart = () => {
  const [rideView, setrideView] = useState(false);
  const rideViewRef = useRef(null)
  const {ride} = useContext(RideDataContext)
  const navigate = useNavigate()
  const {socket} = useContext(SocketDataContext)
  const handleSubmit = async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/captain-ride-end`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params:{
          ride:ride
        }
      })
      if(response.status===201){
        navigate("/captain-home")
      }
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
      socket.on("ride-completed",()=>{
        navigate("/captain-home")
      })
  },[])
  useGSAP(function(){
    if(rideView){
      gsap.to(rideViewRef.current,{
        transform:"translateY(0)"
      })
    }
    else{
      gsap.to(rideViewRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[rideView])
  return (
    <div className="h-screen w-screen overflow-hidden relative">
        <img className="w-16 absolute top-0 py-5 ml-5" 
   src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
   alt="Uber Logo" />
    <div className="h-4/5">
    <div className="h-full w-full">
      <img className="h-full w-full object-cover" src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="Background" />
    </div>
    </div>
    <div  className="h-1/5 bg-yellow-400">
    <h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
      setrideView(true);
      }} ><i className="ri-arrow-up-wide-line"></i></h4>
      <div className="flex justify-between items-center mx-6 mt-4">
        <h4 className="font-semibold text-2xl">
            4 KM away
        </h4>
        <button onClick={()=>{
          setrideView(true);
        }}className="bg-green-400 px-12 py-2 rounded-lg font-semibold text-gray-100">Complete</button>
      </div>
    </div>
    <div  ref={rideViewRef} className="fixed z-20 bottom-0 bg-white w-full -translate-y-full">
        <CompleteRides handleSubmit={handleSubmit} setrideView={setrideView}/>
    </div>
    </div>
  )
}

export default CaptainRideStart