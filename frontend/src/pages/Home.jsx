import React from 'react'
import {Link} from "react-router-dom"
import UserProtectorWrapper from '../UserProtectorWrapper'
const Home = () => {
  return (

        <div className="h-screen w-screen pt-5 bg-cover bg-bottom  flex flex-col justify-between bg-red-400 bg-[url(https://images.unsplash.com/photo-1618530131673-c8c02d861593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)]">
                <img className="w-25 p-0  ml-5"  src="/ride-it-logo-white.png" alt="" />
                <div className="bg-white py-4 px-4 ">
                    <h2 className="text-black text-2xl font-bold">Get Started with RideIt</h2>
                    <Link to="/user-login" style={{color:"white"}} className="h-10 text-white flex  justify-center items-center w-full rounded mt-2 bg-black">Continue</Link>
                </div>
    </div>
  )
}

export default Home