import React from 'react'

const CompleteRides = (props) => {
    return (
        <div className="">
            <h4 className="text-2xl ml-45 font-semibold"  onClick={()=>{
                props.setrideView(false)
      }} ><i className="ri-arrow-down-wide-line"></i></h4>
      <h2 className="font-bold text-2xl mb-7 mt-4 pl-5 ">Finish This Ride</h2>
      <div className="w-full flex flex-col justify-between items-center gap-2">
        <div className="flex justify-between items-center w-[92%] mx-4 rounded-2xl bg-yellow-400 p-3">
          <div className="flex justify-between items-center gap-4">
      <img className='h-13 rounded-full object-cover' src="https://media.istockphoto.com/id/1362448780/photo/candid-portrait-of-early-30s-indian-man-standing-outdoors.jpg?s=612x612&w=0&k=20&c=DK4Av6dkbiS-koLkBOK4vv8Jh4y_KtHRXa45Q97RCQo=" alt="" />
      <h4 className="text-xl font-semibold">Msg Insan</h4>
      </div>
      <h4 className="text-xl font-bold">2.2 KM</h4>
      </div>
      <div className="w-full flex flex-col justify-between gap-2">
       <div className="flex  justify-start items-center border-b-2 border-gray-200 mx-4">
             <h4 className="text-lg p-5"><i className="ri-map-pin-2-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">562/11 A</h2>
            <h3 className="text-sm">kankariya Talab, Bhopal</h3>
            </div>
            </div>
            <div className="w-full flex  justify-start items-center border-b-2 border-gray-200 mx-4">
            <h4 className="text-lg p-5"><i className="ri-map-pin-fill"></i></h4>
        <div className="">
            <h2 className="text-2xl font-semibold ">562/11 A</h2>
            <h3 className="text-sm">kankariya Talab, Bhopal</h3>
            </div>
            </div>
            <div className="flex  justify-start items-center mx-4">
             <h4 className="text-lg p-5"><i className="ri-currency-line"></i></h4>
        <div className="">
            <h2 className="font-semibold text-2xl">₹193.20</h2>
            <h3 className="text-sm">Cash</h3>
            </div>
            </div>
        <div className="flex justify-center px-4  mb-10 mt-2" onClick={()=>{
        
        }}>
            <button onClick={props.handleSubmit} className="bg-green-500 w-full p-2 rounded-lg  py-4 font-semibold text-white">Complete Ride</button>
        </div>
        
      </div>
      </div>
      </div>
      
    )
}

export default CompleteRides