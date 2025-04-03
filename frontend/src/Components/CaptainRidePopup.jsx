import React,{useContext} from 'react'
import {RideDataContext} from "../contexts/RideContext"
import {SocketDataContext} from "../contexts/SocketContext"
import {useNavigate} from "react-router-dom"
import axios from "axios"
const CaptainRidePopup = (props) => {
    const {ride} = useContext(RideDataContext)
    const {socket} = useContext(SocketDataContext)
    const navigate = useNavigate()
    console.log(ride)
    const submitHandler=async()=>{
        try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/ride-start`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            params:{
                ride:ride,
                otp:props.otp
            }
        })
        console.log(response.status)
        if(response.status===201){
            navigate("/captain-ride-start");
        }
        else{
            props.otp = "Your otp is wrong"
        }
    }
    catch(err){
        console.log(err)
    }
    }
    return (
        <div className="">
            <h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
                props.setconfirmRidePopup(false)
      }} ><i className="ri-arrow-down-wide-line"></i></h4>
      <h2 className="font-bold text-2xl mb-7 mt-4 pl-5 tracking-tight">Confirm this ride to start</h2>
      <div className="w-full flex flex-col justify-between items-center gap-2">
        <div className="flex justify-between items-center w-[92%] mx-4 rounded-2xl border-2 border-yellow-400 p-3 mb-4">
          <div className="flex justify-between items-center gap-4">
      <img className='h-13 rounded-full object-cover' src="https://media.istockphoto.com/id/1362448780/photo/candid-portrait-of-early-30s-indian-man-standing-outdoors.jpg?s=612x612&w=0&k=20&c=DK4Av6dkbiS-koLkBOK4vv8Jh4y_KtHRXa45Q97RCQo=" alt="" />
      <h4 className="text-xl font-semibold">{ride?.user.fullname.firstname}</h4>
      </div>
      <h4 className="text-xl font-bold">2.2 KM</h4>
      </div>
      <div className="w-full flex flex-col justify-between gap-2">
       <div className="flex  justify-start items-center border-b-2 border-gray-200 mx-4">
             <h4 className="text-lg p-5"><i className="ri-map-pin-2-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">562/11 A</h2>
            <h3 className="text-sm">{ride?ride.pickup:""}</h3>
            </div>
            </div>
            <div className="w-full flex  justify-start items-center border-b-2 border-gray-200 mx-4">
            <h4 className="text-lg p-5"><i className="ri-map-pin-fill"></i></h4>
        <div className="">
            <h2 className="text-2xl font-semibold ">562/11 A</h2>
            <h3 className="text-sm">{ride?ride.destination:""}</h3>
            </div>
            </div>
            <div className="flex  justify-start items-center mx-4">
             <h4 className="text-lg p-5"><i className="ri-currency-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">{ride?.fare}</h2>
            <h3 className="text-sm">Cash</h3>
            </div>
            </div>
            <div className="flex justify-center px-4 mb-2" onClick={()=>{
           
        }}>
            <input value={props.otp} onChange={(evt)=>{
                props.setOtp(evt.target.value)
            }} className="bg-gray-200 w-full p-2 rounded-lg  font-semibold text-black text-center py-4" type="text" placeholder="Enter Otp" />
        </div>
        <div className="flex justify-center px-4 mb-2 mt-2" onClick={()=>{
            submitHandler()
        }}>
            <button className="bg-green-500 w-full p-2 rounded-lg  font-semibold text-white">Confirm</button>
        </div>
        <div className="flex justify-center px-4 mb-2" onClick={()=>{
           
           props.setconfirmRidePopup(false);
          }}>
              <button className="bg-red-700 w-full p-2 rounded-lg  font-semibold text-black">Cancel</button>
          </div>
      </div>
      </div>
      </div>
      
    )
}

export default CaptainRidePopup