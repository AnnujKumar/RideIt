import React from 'react'
import {useContext} from "react"
import { CaptainDataContext } from '../contexts/CaptainContext'
const CaptainInformation = () => {
    const {captain,setCaptain} = useContext(CaptainDataContext)
  return (
    <div>
    <div className="flex justify-between items-center p-4 ">
        <div className="flex justify-between items-center gap-3">
        <img className="h-15 w-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMARfSdi_vhJYKZ5hUEY8wcpYJ-scZeocOXw&s" alt="" />
        <h4 className="text-xl font-semibold">{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h4>
        </div>
        <div className="">
            <h4 className="font-bold text-2xl">₹289.5</h4>
            <p className="text-base font-semibold">Earned</p>
        </div>

    </div>
    <div className="flex justify-evenly items-center m-2 rounded-lg bg-gray-100 py-4 mt-4">
        <div className="">
            <h4 className="text-center text-3xl"><i className="ri-time-line"></i></h4>
            <h4 className="text-center font-bold text-md">10.3</h4>
            <h4 className="text-center text-md font-semibold text-gray-500">Hours Online</h4>
        </div>
        <div>
        <h4 className="text-center text-3xl"><i className="ri-time-line"></i></h4>
            <h4 className="text-center font-bold text-md">10.3</h4>
            <h4 className="text-center text-md font-semibold text-gray-500">Hours Online</h4>
        </div>
        <div>
        <h4 className="text-center text-3xl"><i className="ri-booklet-line"></i></h4>
            <h4 className="text-center font-bold text-md">10.3</h4>
            <h4 className="text-center text-md font-semibold text-gray-500">Hours Online</h4>
        </div>
    </div>
    </div>

  )
}

export default CaptainInformation