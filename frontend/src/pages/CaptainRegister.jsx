import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import VehicleRegister from './VehicleRegister'
import {CaptainDataContext} from "../contexts/CaptainContext"
const CaptainRegister = () => {
  let newCaptain = {};
  const [data, setData] = useState({email:"",password:"",firstname:"",lastname:"",username:""})
  const [refer, setRefer] = useState(false)
  const handleChange =(evt)=>{
    setData((d)=>({
          ...d,[evt.target.name]:evt.target.value
    }))
  }

  const handleSubmit = async (evt)=>{
        evt.preventDefault();
        
        setRefer(true)
  }

  if(!refer){
  return (
    <div className="w-screen h-screen px-5 py-5 flex flex-col justify-between  bg-white">
        <div  className="">
          <img className="w-20 mb-8" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
          <form action="" onSubmit={handleSubmit}>
              <h3 className="text-black text-lg font-medium">What's Your Name</h3>
              <div className="flex gap-2">
              <input  type="text" onChange={handleChange} value={data.firstname} name="firstname" className="w-1/2 px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='firstname' />
              <input  type="text" onChange={handleChange} value={data.lastname} name="lastname" className="w-1/2 px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='lastname' />
              </div>
              <h3 className="text-black text-lg font-medium">What's Your Email</h3>
              <input  onChange={handleChange} type="email" value={data.email} name="email" className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='xyz@example.com' />
              <h3 className="text-black text-lg font-medium">Set a Password</h3>
              <input onChange={handleChange} value={data.password} name="password" type="password"  className="w-full px-4 py-2 bg-[#EEEEEE]  border mb-7 rounded text-black placeholder:text-base" required placeholder='password' />
              <button className=" w-full font-bold text-center" style={{backgroundColor:"#9B5127"}} >
                Register
              </button>
              </form>
              <p className=" text-black   text-center font-medium">Already a Captain?  <Link to="/captain-login">Login here</Link></p>
        </div>
        <div>

        </div>
    </div>

  )
}
else{
  return(
    <VehicleRegister captain={data}/>
)
}
}

export default CaptainRegister