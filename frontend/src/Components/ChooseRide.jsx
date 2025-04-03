import React from 'react'

const ChooseRide = (props) => {
  return (
        <div className="">
            <h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
                props.setconformRidePanel(false);
      }} ><i className="ri-arrow-down-wide-line"></i></h4>
      <h2 className="font-bold text-2xl mb-7 mt-4 pl-5 ">Confirm Ride</h2>
      <div className="w-full flex flex-col justify-between items-center gap-2">
      <img className='h-20 mb-4' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
      <div className="w-full flex flex-col justify-between gap-2">
       <div className="flex  justify-start items-center border-b-2 border-gray-200 mx-4">
             <h4 className="text-lg p-5"><i className="ri-map-pin-2-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">562/11 A</h2>
            <h3 className="text-sm">{props.input.pickup}</h3>
            </div>
            </div>
            <div className="w-full flex  justify-start items-center border-b-2 border-gray-200 mx-4">
            <h4 className="text-lg p-5"><i className="ri-map-pin-fill"></i></h4>
        <div className="">
            <h2 className="text-2xl font-semibold ">562/11 A</h2>
            <h3 className="text-sm">{props.input.drop}</h3>
            </div>
            </div>
            <div className="flex  justify-start items-center mx-4">
             <h4 className="text-lg p-5"><i className="ri-currency-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">{props.fare}</h2>
            <h3 className="text-sm">Cash</h3>
            </div>
            </div>
        <div className="flex justify-center p-4" onClick={()=>{
            props.setlookingForDriver(true);
            props.setconformRidePanel(false);
            props.createRide()
        }}>
            <button className="bg-green-500 w-full p-2 rounded-lg  font-semibold text-gray-100">Confirm</button>
        </div>
      </div>
      </div>
      </div>
      
  )
}

export default ChooseRide;