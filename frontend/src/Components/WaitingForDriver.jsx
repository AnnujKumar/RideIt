import React,{useContext} from 'react'
import { RideDataContext } from '../contexts/RideContext'
import {UserDataContext} from "../contexts/UserContext"
import axios from "axios"
const WaitingForDriver = (props) => {
    let prop = null
  return (
    <div className="">
    <h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
        props.setwaitDriver(false)
}} ><i className="ri-arrow-down-wide-line"></i></h4>

<div className="w-full flex flex-col justify-between items-center gap-2">
    <div className="w-full flex justify-between items-center p-5">
<img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
<div className="text-right">
    <h2 className="font-bold text-lg -m-2">{props?.ride?.captain?.fullname.firstname}</h2>
    <h1 className="font-semibold text-lg -m-2">{props?.ride?.captain?.Vehicle.plate}</h1>
    <p className="text-base font-light -m-2">Maruti Suzuki Swift</p>
</div>
</div>
<div className="w-full flex flex-col justify-between gap-2">
<div className="flex  justify-start items-center border-b-2 border-gray-200 mx-4">
     <h4 className="text-lg p-5"><i className="ri-map-pin-2-line"></i></h4>
<div className="">
    <h2 className="font-semibold text-2xl">562/11 A</h2>
    <h3 className="text-sm">{props?.ride?.pickup}</h3>
    </div>
    </div>
    <div className="w-full flex  justify-start items-center border-b-2 border-gray-200 mx-4">
    <h4 className="text-lg p-5"><i className="ri-map-pin-fill"></i></h4>
<div className="">
    <h2 className="text-2xl font-semibold ">562/11 A</h2>
    <h3 className="text-sm">{props?.ride?.destination}</h3>
    </div>
    </div>
    <div className="flex  justify-start items-center mx-4">
     <h4 className="text-lg p-5"><i className="ri-currency-line"></i></h4>
<div className="">
    <h2 className="font-semibold text-2xl">{props?.ride?.fare}</h2>
    <h3 className="text-sm">Cash</h3>
    </div>
    
    </div>
    <div className="flex  justify-start items-center mx-4">
    <h4 className="text-lg p-5"><i class="ri-lock-password-line"></i></h4>
    <div className="flex justify-between w-full">
        <h2 className="font-bold text-2xl">Otp</h2>
        <h3 className="text-xl font-bold">{props?.ride?.otp}</h3>
        </div>
    </div>

</div>
</div>
</div>
  )
}

export default WaitingForDriver