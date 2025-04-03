import React,{useState,useContext} from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {CaptainDataContext} from "../contexts/CaptainContext"
import axios from "axios"
const VehicleRegister = ({captains}) => {
  const [data, setData] = useState({color:"",plate:"",capacity:"",vehicleType:""});
    const navigate = useNavigate()
  const handleChange =(evt)=>{
    setData((d)=>({
          ...d,[evt.target.name]:evt.target.value
    }))
  }
  const {captain,setCaptain} = useContext(CaptainDataContext)

  const handleSubmit = async (evt)=>{
        evt.preventDefault();
        try{
        console.log(captains)
        const vehicleData = {...data}
        const response = await axios.post("http://localhost:3000/captain/register",{captain:captains,vehicleData:vehicleData});
        if(response.status===401){
            console.log(response.message);
            return navigate("/captain-register")
        }
        setCaptain(response.data)
        navigate("/captain-home")
        }
        catch(err){
            console.log(err.message);
        }
  }
  return (
    <div className="w-screen h-screen px-5 py-5 flex flex-col justify-between  bg-white">
        <div  className="">
          <img className="w-20 mb-8" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
          <form action="" onSubmit={handleSubmit}>
          <h3 className="text-black text-lg font-medium">What's Your Vehicle's Color</h3>
              <input  type="text" onChange={handleChange} value={data.color} name="color" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='Enter color' />

              <h3 className="text-black text-lg font-medium">Enter Plate Number</h3>
              <input  type="text" onChange={handleChange} value={data.plate} name="plate" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='Plate number' />
              <h3 className="text-black text-lg font-medium">Passenger Capacity</h3>
              <input  onChange={handleChange} type="number" value={data.capacity} name="capacity" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='sitting capacity' />
              <h3 className="text-black text-lg font-medium">Enter Vehicle Type</h3>
              <input onChange={handleChange} value={data.vehicleType} name="vehicleType" type="text"  className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-7 rounded text-black placeholder:text-base" required placeholder='vehicle-type' />
              <button className=" w-full font-bold text-center" style={{backgroundColor:"#9B5127"}} >
                Register Vehicle
              </button>
              </form>
        </div>
        <div>
        </div>
    </div>
  )
}

export default VehicleRegister;