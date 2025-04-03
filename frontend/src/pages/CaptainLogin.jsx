import React from 'react'
import {useState,useEffect,useContext} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import {CaptainDataContext} from "../contexts/CaptainContext"
import {useNavigate} from "react-router-dom"
const CaptainLogin = () => {
  const [users,setUsers] = useState("");
  const [password,setPassword] = useState("");
  const {captain,setCaptain} = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleUser = (evt)=>{
      setUsers(evt.target.value);
  }
  const handlePassword = (evt)=>{
    setPassword(evt.target.value);
  }

  const handleSubmit = async (evt)=>{
    evt.preventDefault();
    const response = await axios.post("http://localhost:3000/captain/login",{email:users,password:password});
    console.log(response)
    if(response.status===201){
          localStorage.setItem("token",response.data.token);
          setCaptain(response.data.user);
          return navigate("/captain-home");
    }
    else if(response.status===401){
          return navigate("/captain-login")
    }
    
  }
  return (
      <div className="h-screen w-screen bg-white p-7 flex flex-col justify-between">
        
        <div className="h-40 flex flex-col  justify-between">
        <img className="w-25 mb-5" src="/ride-it-logo-black.png" alt="" />
          <form action="" onSubmit={handleSubmit} className="w-full">
            <h3 className="text-black text-lg font-medium">What's Your Username</h3>
              <input onChange={handleUser} type="email" className="w-full px-4 py-3 bg-[#EEEEEE]  border mb-5 rounded text-black placeholder:text-base" required placeholder='username' value = {users} />
          
          <h3 className="text-black text-lg font-medium">Enter Password</h3>
          <input  onChange={handlePassword} value={password} className="w-full px-4 py-3 border bg-[#EEEEEE] h-fit text-black mb-5 rounded placeholder:text-base" required  placeholder='password' type="password" />
            <button type="submit" className="py-3 flex justify-center items-center w-full rounded bg-black mb-2" style={{color:"white"}} >
            Login
            </button>
            </form>

            <p className="text-black inline text-center">New here?<Link to="/captain-register" className= " text-blue-600">Join our Fleet</Link></p>
          
        </div>
        <div className="w-full pb-10 h-15 ">
          <Link to="/user-login" className="flex text-lg justify-center items-center w-full bg-[#9B5127] rounded font-bold h-10 mb-7" style={{color:"white"}} >Sign in as User</Link>
        </div>
      </div>
  )
}

export default CaptainLogin;