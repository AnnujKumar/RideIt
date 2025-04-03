import React from 'react'

const ConfirmRides = (props) => {
  return (
    <div><h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
        props.setvehiclePanel(false);
      }} ><i className="ri-arrow-down-wide-line"></i></h4>
      <h2 className="font-bold text-2xl mb-5 pl-5">Choose a Vehicle</h2>
      <div onClick={()=>{
         props.setvehicleType("car")
        props.setvehiclePanel(false);
        props.setconformRidePanel(true);
      }} className="flex items-center justify-start border-gray-200 active:border-black border-4 rounded-2xl p-2 m-2" >
        <img className="h-15 w-25" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
        <div className="w-[50%]">
          <h3 className="font-bold text-xl">Go <span className="text-sm"><i className="ri-user-3-fill">4</i></span></h3>
          <h4 className="font-bold">2 mins away</h4>
          <h5 className="font-light text-sm">Affordable, compact rides</h5>
        </div>
        <h2 className="text-xl font-bold"><span><i className="ri-money-rupee-circle-line"></i></span>{props.vehicleFares.car}</h2>
      </div>
      <div onClick={()=>{
         props.setvehicleType("moto")
         props.setvehiclePanel(false);
        props.setconformRidePanel(true);
      }} className="flex items-center justify-start border-gray-200 active:border-black border-4 rounded-2xl p-2 m-2" >
        <img className="h-15 w-25" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s" alt="" />
        <div className="w-[50%]">
          <h3 className="font-bold text-xl">Moto <span className="text-sm"><i className="ri-user-3-fill">2</i></span></h3>
          <h4 className="font-bold">2 mins away</h4>
          <h5 className="font-light text-sm">Affordable, compact rides</h5>
        </div>
        <h2 className="text-xl font-bold"><span><i className="ri-money-rupee-circle-line"></i></span>{props.vehicleFares.moto}</h2>
      </div><div onClick={()=>{
        props.setvehicleType("auto")
         props.setvehiclePanel(false);
        props.setconformRidePanel(true);
      }} className="flex items-center justify-start border-gray-200 active:border-black border-4 rounded-2xl p-2 m-2" >
        <img className="h-15 w-25" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className="w-[50%]">
          <h3 className="font-bold text-xl">AutoRide <span className="text-sm"><i className="ri-user-3-fill">4</i></span></h3>
          <h4 className="font-bold">2 mins away</h4>
          <h5 className="font-light text-sm">Affordable, compact rides</h5>
        </div>
        <h2 className="text-xl font-bold"><span><i className="ri-money-rupee-circle-line"></i></span>{props.vehicleFares.auto}</h2>
      </div></div>
  )
}

export default ConfirmRides