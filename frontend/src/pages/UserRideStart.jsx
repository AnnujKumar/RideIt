import React,{useEffect,useContext,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { SocketDataContext } from '../contexts/SocketContext';
import { RideDataContext } from '../contexts/RideContext';
import axios from "axios"
const UserRideStart = () => {
  const navigate = useNavigate();
  const {socket} = useContext(SocketDataContext);
  const {ride} = useContext(RideDataContext)
  const handleSubmit = async()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/user-ride-end`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          params:{
            ride:ride
          }
        })
        if(response.status===201){
          navigate("/user-home")
        }
      }
      catch(err){
        console.log(err)
      }
  }
  useEffect(()=>{
      socket.on("ride-completed",()=>{
        navigate("/user-home")
      })
  },[])
  return (
    <div className="h-screen">
      <div className="h-1/2">      
         <img className="h-full w-full object-cover" src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="Background" />
         </div>
         <div className="h-1/2">
         <div className="h-full w-full flex flex-col justify-evenly items-center gap-1">
    <div className="w-full flex justify-between items-center py-2 px-5">
<img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
<div className="text-right">
    <h2 className="font-bold text-lg -m-2">Sarthak</h2>
    <h1 className="font-semibold text-lg -m-2">MP04 AB 4321</h1>
    <p className="text-base font-light -m-2">Maruti Suzuki Alto</p>
</div>
</div>
<div className="w-full flex flex-col justify-between gap-2">
    <div className="w-full flex  justify-start items-center border-b-2 border-gray-200 mx-4 py-2">
    <h4 className="text-lg p-4"><i className="ri-map-pin-fill"></i></h4>
<div className="">
    <h2 className="text-2xl font-semibold ">562/11 A</h2>
    <h3 className="text-sm">kankariya Talab, Bhopal</h3>
    </div>
    </div>
    <div className="flex  justify-start items-center mx-4">
     <h4 className="text-lg p-4"><i className="ri-currency-line"></i></h4>
<div className="">
    <h2 className="font-semibold text-2xl">₹193.20</h2>
    <h3 className="text-sm">Cash</h3>
    </div>
    </div>
    <div className="px-4">
    <button  onClick={handleSubmit} className="bg-green-500 w-full p-2 rounded-lg  font-semibold text-gray-100">Make Payment</button>
    </div>

</div>
</div>
         </div>
    </div>
  )
}

export default UserRideStart